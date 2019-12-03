var network_window = $("#network-window");
var open_window_toggle = $("#open-window");
var close_window_toggle = $("#close-window");
var hop_window_content = $("#hops-window-content");

var $canvas = $("#network-canvas");
var network_canvas = $("#network-canvas")[0];
var network_canvas_context = network_canvas.getContext('2d');

function start_application() {
    let network = new Network("Internet");

    var wifi_router = network.add_router("WiFi Router");
    wifi_router.add_interface(network.generate_mac(), network.generate_ip());
    wifi_router.add_interface(network.generate_mac(), network.generate_ip());

    var global_router_1 = network.add_router("Global Router 1");
    global_router_1.add_interface(network.generate_mac(), network.generate_ip());

    var global_router_2 = network.add_router("Global Router 2");
    global_router_2.add_interface(network.generate_mac(), network.generate_ip());

    var global_router_3 = network.add_router("Global Router 3");
    global_router_3.add_interface(network.generate_mac(), network.generate_ip());

    var laptop = network.add_client("Yoga 920");
    var phone_1 = network.add_client("Samsung Galaxy S9");

    var dns_server = network.add_server("DNS Server");
    var web_server = network.add_server("Web Server");

    network.setup_connection(laptop, wifi_router, 0, 0);
    network.setup_connection(phone_1, wifi_router, 0, 0);

    network.setup_connection(wifi_router, global_router_1, 1, 0);
    network.setup_connection(wifi_router, global_router_2, 2, 0);

    network.setup_connection(dns_server, global_router_1, 0, 1);
    network.setup_connection(global_router_2, global_router_3, 1, 0);

    network.setup_connection(web_server, global_router_3, 0, 1);

    var network_view = new NetworkRenderer(network);
}


class NetworkRenderer {
    constructor(network) {
        this.render_network(network);
        console.log(network);
        $(window).on('resize', () => this.render_network());
    }

    set_render_data(network) {
        this.network = network;
        this.devices = network.get_devices();
        this.clients = network.get_devices().filter(function (element) {
            return element.get_type() == "c";
        });

        this.routers = network.get_devices().filter(function (element) {
            return element.get_type() == "r";
        });

        this.servers = network.get_devices().filter(function (element) {
            return element.get_type() == "s";
        });

        this.links = network.links;

        for (var device in this.network.devices) {
            var temp_device = this.network.devices[device];
            for (var interface_1 in temp_device.interfaces) {
                var temp_interface_1 = temp_device.interfaces[interface_1];
                for (var interface_2 in temp_device.interfaces) {
                    var temp_interface_2 = temp_device.interfaces[interface_2];
                    if (temp_interface_1.ip_address != temp_interface_2.ip_address) {
                        this.network.links_graph[temp_interface_1.ip_address].push(temp_interface_2.ip_address);
                    }
                }
            }
        }
    }

    resize_canvas() {
        $canvas.removeLayers();

        this.width = network_canvas.offsetWidth;
        this.height = network_canvas.offsetHeight;

        network_canvas.setAttribute('width', this.width);
        network_canvas.setAttribute('height', this.height);

        this.x_margin = 20;
        this.y_margin = 50;
        this.x_actual = (this.width - this.x_margin);
        this.y_actual = (this.height - this.y_margin);
        this.x_c = this.x_actual / 2;
        this.y_c = this.y_actual / 2;
    }

    render_network(network = null) {
        this.network = (network == null) ? this.network : network;
        this.set_render_data(this.network);
        this.resize_canvas();

        for (var client in this.clients) {
            var sliced_height = this.y_actual / this.clients.length;
            var center_height = sliced_height / 2;

            var sliced_width = this.x_actual / 2;
            var center_width = sliced_width - sliced_width / 2;

            var x = center_width;
            var y = sliced_height * client + center_height;

            if (this.clients[client].coordinates) {
                x = this.clients[client].coordinates[0];
                y = this.clients[client].coordinates[1];
            }

            this.devices[this.clients[client].index].coordinates = [x, y];

            this.render_device(this.clients[client], client, x, y);
        }

        for (var router in this.routers) {
            var sliced_height = this.y_actual / this.routers.length;
            var center_height = sliced_height / 2;

            var sliced_width = this.x_actual / 2;
            var center_width = sliced_width;

            var x = center_width;
            var y = sliced_height * router + center_height;

            if (this.routers[router].coordinates) {
                x = this.routers[router].coordinates[0];
                y = this.routers[router].coordinates[1];
            }

            this.devices[this.routers[router].index].coordinates = [x, y];

            this.render_device(this.routers[router], router, x, y);
        }

        for (var server in this.servers) {

            var sliced_height = this.y_actual / this.servers.length;
            var center_height = sliced_height / 2;

            var sliced_width = this.x_actual / 2;
            var center_width = sliced_width + sliced_width / 2;

            var x = center_width;
            var y = sliced_height * server + center_height;

            if (this.servers[server].coordinates) {
                x = this.servers[server].coordinates[0];
                y = this.servers[server].coordinates[1];
            }

            this.devices[this.servers[server].index].coordinates = [x, y];

            this.render_device(this.servers[server], server, x, y);
        }

        this.render_links();
    }

    render_links() {
        $canvas.removeLayerGroup('links');

        for (var link in this.links) {
            var coordinates = [];

            var i1 = $canvas.getLayer(this.links[link].i1_type + '_interface_box_' + this.links[link].i1_dev + '_' + this.links[link].i1_int);
            var i2 = $canvas.getLayer(this.links[link].i2_type + '_interface_box_' + this.links[link].i2_dev + '_' + this.links[link].i2_int);

            coordinates[0] = i1.x;
            coordinates[1] = i1.y;
            coordinates[2] = i2.x;
            coordinates[3] = i2.y;

            this.render_links_helper(link, coordinates);
        }
    }

    render_links_helper(link, coordinates) {
        $canvas.addLayer({
            type: 'line',
            groups: ['links'],
            name: 'link_' + link,
            layer: true,
            strokeStyle: '#7383bf',
            shadowColor: '#222', shadowBlur: 3,
            strokeWidth: 10,
            rounded: true,
            index: -1,
            x1: coordinates[0], y1: coordinates[1],
            x2: coordinates[2], y2: coordinates[3]
        });
    }

    render_device(data, index, x, y) {
        var type = (data.type == "c") ? "client" : (data.type == "r" ? "router" : "server");
        var font = "12pt";
        var name = data.name;
        var index = data.index;


        $canvas.addLayer({
            type: 'image', source: 'img/' + type + '.png',
            groups: [index],
            dragGroups: [index],
            name: type + '_image' + index, layer: true,
            x: x, y: y,
            width: 100, height: 100, fromCenter: true,
            shadowColor: '#222', shadowBlur: 3,
            rotate: 0,
            data: data,
            cursors: {
                mouseover: 'pointer',
                mousedown: 'pointer',
                mouseup: 'pointer'
            },
            drag: function (layer) {
                this.network.devices[data.index].coordinates = [layer.x, layer.y];
                this.render_links();
            }.bind(this),
            dragstop: function (layer) {
                this.network.devices[data.index].coordinates = [layer.x, layer.y];
                this.render_links();
            }.bind(this)
        });

        $canvas.addLayer({
            type: 'text',
            groups: [index],
            name: type + '_name_' + index,
            layer: true,
            fillStyle: '#bcc5e4',
            strokeWidth: 1,
            x: x, y: y + 73,
            fontSize: font, fontFamily: 'Solway, serif',
            text: name
        });

        $canvas.addLayer({
            type: 'rectangle',
            groups: [index],
            name: type + '_name_box_' + index,
            fillStyle: '#556080',
            x: x, y: y + 73,
            index: -1,
            width: $canvas.measureText(type + '_name_' + index).width * 1.3, height: 22, fromCenter: true,
            shadowColor: '#222', shadowBlur: 3
        });

        for (var i in data.interfaces) {
            var temp_interface = data.interfaces[i];

            var n = data.interfaces.length;
            var y_i = i * 30 - (n / 2 * 30) + 15;

            $canvas.addLayer({
                type: 'rectangle',
                groups: [index],
                name: type + '_interface_box_' + index + '_' + temp_interface.id,
                fillStyle: '#556080',
                x: x + 48, y: y + y_i,
                width: 20, height: 20, fromCenter: true,
                shadowColor: '#222', shadowBlur: 3
            });
        }

        $canvas.drawLayers();
    }
}

class Network {
    constructor(name) {
        this.name = name;
        this.devices = [];
        this.links = [];
        this.links_graph = {};

        this.ip_list = [];
        this.mac_list = [];
    }

    get_devices() {
        return this.devices;
    }

    get_device_by_ip_address(ip_address) {
        for (var i in this.devices) {
            var temp_device = this.devices[i];

            for (var j in temp_device.interfaces) {
                var temp_interface = temp_device.interfaces[j];

                if (temp_interface.ip_address == ip_address) {
                    return {
                        device: temp_device,
                        interface_d: temp_interface
                    };
                }
            }
        }

        return { device: null, interface_d: null };
    }

    get_device_by_mac_address(mac_address) {
        for (var i in this.devices) {
            var temp_device = this.devices[i];

            for (var j in temp_device.interfaces) {
                var temp_interface = temp_device.interfaces[j];

                if (temp_interface.mac_address == mac_address) {
                    return {
                        device: temp_device,
                        interface_d: temp_interface
                    };
                }
            }
        }

        return { device: null, interface_d: null };
    }

    generate_ip() {
        let ip_address = (Math.floor(Math.random() * 255) + 1) + "." + (Math.floor(Math.random() * 255) + 0) + "." + (Math.floor(Math.random() * 255) + 0) + "." + (Math.floor(Math.random() * 255) + 0);

        while (this.ip_list.indexOf(ip_address) != -1) {
            ip_address = (Math.floor(Math.random() * 255) + 1) + "." + (Math.floor(Math.random() * 255) + 0) + "." + (Math.floor(Math.random() * 255) + 0) + "." + (Math.floor(Math.random() * 255) + 0);
        }

        this.links_graph[ip_address] = [];

        this.ip_list.push(ip_address);

        return ip_address;
    }

    generate_mac() {
        let mac_address = "XX:XX:XX:XX:XX:XX".replace(/X/g, function () {
            return "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16))
        });

        while (this.mac_list.indexOf(mac_address) != -1) {
            mac_address = "XX:XX:XX:XX:XX:XX".replace(/X/g, function () {
                return "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16))
            });
        }

        this.mac_list.push(mac_address);

        return mac_address;
    }

    add_client(name) {
        return this.devices[this.devices.push(new Device(name, this.devices.length, "c", this.generate_mac(), this.generate_ip())) - 1];
    }

    add_router(name) {
        return this.devices[this.devices.push(new Device(name, this.devices.length, "r", this.generate_mac(), this.generate_ip())) - 1];
    }

    add_server(name) {
        return this.devices[this.devices.push(new Device(name, this.devices.length, "s", this.generate_mac(), this.generate_ip())) - 1];
    }

    add_link(interface_1, device_1, interface_2, device_2) {
        var i1_type = (device_1.type == "c") ? "client" : (device_1.type == "r" ? "router" : "server");
        var i2_type = (device_2.type == "c") ? "client" : (device_2.type == "r" ? "router" : "server");

        this.links.push({
            i1_dev: device_1.index,
            i1_type: i1_type,
            i1_int: interface_1.id,
            i1_ip: interface_1.ip_address,
            i1_mac: interface_1.mac_address,
            i2_dev: device_2.index,
            i2_type: i2_type,
            i2_int: interface_2.id,
            i2_ip: interface_2.ip_address,
            i2_mac: interface_2.mac_address
        });

        this.links_graph[interface_1.ip_address].push(interface_2.ip_address);
        this.links_graph[interface_2.ip_address].push(interface_1.ip_address);
    }

    setup_connection(device_1, device_2, interface_id_1, interface_id_2) {
        var interface_1 = device_1.interfaces[interface_id_1];
        var interface_2 = device_2.interfaces[interface_id_2];

        device_1.add_connection(interface_2, interface_id_1);
        device_2.add_connection(interface_1, interface_id_2);

        this.add_link(interface_1, device_1, interface_2, device_2);
    }
}

class Device {
    constructor(name, index, type, mac_address, ip_address) {
        this.name = name;
        this.index = index;
        this.type = type;
        this.interfaces = [];
        this.forwarding_table = {};

        this.add_interface(mac_address, ip_address);
    }

    get_type() {
        return this.type;
    }

    add_interface(mac_address, ip_address) {
        this.interfaces.push(new Interface(this.interfaces.length, mac_address, ip_address));
    }

    add_connection(interface_object, interface_id) {
        this.forwarding_table[interface_object.ip_address] = interface_id;
    }
}

class Interface {
    constructor(id, mac_address, ip_address) {
        this.id = id;
        this.ip_address = (ip_address == null) ? "" : ip_address;
        this.mac_address = mac_address;
    }

    get_ip_address() {
        return this.ip_address;
    }

    get_mac_address() {
        return this.mac_address;
    }
}

function toggle_toolbar(toggle) {
    if (toggle) {
        open_window_toggle.hide();
        close_window_toggle.show();
        hop_window_content.slideDown();
    } else {
        open_window_toggle.show();
        close_window_toggle.hide();
        hop_window_content.slideUp();
    }
}

function copy_array_1d(arr1) {
    return arr1.slice();
}

function copy_array_2d(arr1) {
    return arr1.map(x => x.slice()).slice();
}

function copy_object(obj1) {
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    return obj3;
}

start_application();
toggle_toolbar(false);