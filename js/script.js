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

    console.log(network);

    var network_view = new NetworkRenderer(network);
    console.log(network_view);
}


class NetworkRenderer {
    constructor(network) {
        this.render_network(network);

        $(window).on('resize', () => this.render_network());
    }

    set_render_data(network) {
        this.network = network;
        this.clients = network.get_devices().filter(function (element) {
            return element.get_type() == "c";
        });
        this.routers = network.get_devices().filter(function (element) {
            return element.get_type() == "r";
        });
        this.servers = network.get_devices().filter(function (element) {
            return element.get_type() == "s";
        });

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

        for (var node in this.network.links_graph) {
            var temp_node = this.network.links_graph[node];

            var data = this.network.get_device_by_ip_address(node);
            console.log(data.device.name + ": " + data.interface_d.id, temp_node.map(function (x) {
                return this.network.get_device_by_ip_address(x).device.name + ": " + this.network.get_device_by_ip_address(x).interface_d.id;
            }.bind(this)));
        }

        let longest_path = this.get_longest_path(this.network.links_graph);
    }

    get_longest_path(nodes) {
        var result = [0, null];
        var pre_result;

        for (var current_node in nodes) {
            pre_result = this.bfs(current_node);
            console.log(pre_result);
            break;
        }

        pre_result = this.bfs(pre_result[1]);
        console.log(pre_result);
    }

    bfs(u) {
        var dis = {};
        for (var i in this.network.ip_list) {
            dis[this.network.ip_list[i]] = -1;
        }

        var q = [];
        q.push(u);

        dis[u] = 0;
        while (q.length != 0) {

            console.log(q.map(function (x) {
                return this.network.get_device_by_ip_address(x).device.name + ": " + this.network.get_device_by_ip_address(x).interface_d.id;
            }.bind(this)));

            var t = q[0];
            q.splice(0, 1);

            for (var i in this.network.links_graph[t]) {
                var v = this.network.links_graph[t][i];
                console.log(this.network.get_device_by_ip_address(v).device.name + ": " + this.network.get_device_by_ip_address(v).interface_d.id + ": " + dis[v])
                
                if (dis[v] == -1) {
                    q.push(v);
                    dis[v] = dis[t] + 1;
                }
            }
        }

        var maxDis = 0;
        var nodeIdx;

        for (var i in this.network.ip_list) {
            if (dis[this.network.ip_list[i]] > maxDis) {
                maxDis = dis[this.network.ip_list[i]];
                nodeIdx = this.network.ip_list[i];
            }
        }
        console.log(dis);
        return [maxDis, nodeIdx, this.network.get_device_by_ip_address(u).device.name + ": " + this.network.get_device_by_ip_address(u).interface_d.id, this.network.get_device_by_ip_address(nodeIdx).device.name + ": " + this.network.get_device_by_ip_address(nodeIdx).interface_d.id];

    }



    get_longest_path_helper(nodes, visited, current_length, max_length) {
        if (current_length > max_length) {
            max_length = current_length;
            console.log(current_length);
            console.log(visited.map(function (x) {
                return this.network.get_device_by_ip_address(x).device.name + ": " + this.network.get_device_by_ip_address(x).interface_d.id;
            }.bind(this)));
        }

        for (var node in nodes) {
            var temp_node = this.network.links_graph[nodes[node]];

            if (visited.indexOf(nodes[node]) == -1) {
                visited.push(nodes[node]);
                max_length = this.get_longest_path_helper(temp_node, copy_array_1d(visited), current_length + 1, max_length);
            }
        }

        return max_length;
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
            this.render_client(this.clients[client], this.clients.length, client);
        }
    }

    render_client(client, amount, index) {
        var sliced_height = this.y_actual / amount;
        var center_height = sliced_height / 2;

        var sliced_width = this.x_actual / 2;
        var center_width = sliced_width / 2;

        var x = center_width;
        var y = sliced_height * index + center_height;

        var font = "12pt";
        var name = client.name;
        var index = client.index;

        $canvas
            .addLayer({
                type: 'image', source: 'img/client.png',
                groups: [index],
                name: 'client_image' + index, layer: true,
                x: x, y: y,
                width: 100, height: 100, fromCenter: true,
                shadowColor: '#222', shadowBlur: 3,
                rotate: 0,
                data: client,
                cursors: {
                    mouseover: 'pointer',
                    mousedown: 'pointer',
                    mouseup: 'pointer'
                },
                click: function (layer) {
                    console.log(layer);
                }.bind(this)
            })
            .addLayer({
                type: 'text',
                groups: [index],
                name: 'client_name' + index,
                layer: true,
                fillStyle: '#bcc5e4',
                strokeWidth: 1,
                x: x, y: y + 73,
                fontSize: font, fontFamily: 'Solway, serif',
                text: name
            })
            .addLayer({
                type: 'rectangle',
                groups: [index],
                name: 'client_name_box' + index,
                fillStyle: '#556080',
                x: x, y: y + 73,
                index: -1,
                width: $canvas.measureText('client_name' + index).width * 1.3, height: 22, fromCenter: true,
                shadowColor: '#222', shadowBlur: 3,
            })
            .drawLayers();
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

    add_link(interface_1, interface_2) {
        this.links.push({
            i1_ip: interface_1.ip_address,
            i1_mac: interface_1.mac_address,
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

        this.add_link(interface_1, interface_2);
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
















































function start_applicationn() {
    var global_network = new Network("Global Network");
    var home_subnetwork = new Subnetwork("Home Network");

    global_network.add_subnetwork(home_subnetwork);

    home_subnetwork.add_client("Yoga 920");
    home_subnetwork.add_client("Samsung Galaxy S8");
    home_subnetwork.add_client("iPhone 7");

    console.log(global_network);

    var view = new ApplicationView(global_network);
}

class ApplicationView {
    constructor(network) {
        this.network = network;

        this.links = [];
        this.clients = [];
        this.routers = [];

        this.resize_canvas(false);

        $(window).on('resize', () => this.resize_canvas(true));
    }

    resize_canvas(update = false) {
        $canvas.removeLayers();

        this.links = [];
        this.clients = [];
        this.routers = [];

        this.width = network_canvas.offsetWidth;
        this.height = network_canvas.offsetHeight;
        network_canvas.setAttribute('width', this.width);
        network_canvas.setAttribute('height', this.height);

        this.margin = 70;

        this.x_c = this.width / 2;
        this.y_c = (this.height - this.margin) / 2;

        if (update) {
            this.render_network();
        }
    }

    set_network(network = this.network) {
        this.network = network;

        for (var i in network.subnetworks) {
            var temp_subnetwork = network.subnetworks[i];

            var router_link = this.set_router(temp_subnetwork.router);
        }
    }

    render_network(network) {
        this.resize_canvas();

        for (var i in network.subnetworks) {
            var temp_subnetwork = network.subnetworks[i];


            for (var j in temp_subnetwork.devices) {
                var temp_device = temp_subnetwork.devices[j];
                var device_links = this.render_client(temp_device, temp_subnetwork.devices.length, j);

                this.links.push([router_link[0], router_link[1], device_links[0], device_links[1]]);
            }
        }

        for (var i in this.links) {
            var temp_link = this.links[i];
            this.render_links(temp_link);
        }
    }

    render_links(link) {
        console.log("link");
        $canvas
            .addLayer({
                type: 'line',
                strokeStyle: '#556080',
                strokeWidth: 5,
                rounded: true,
                x1: link[2], y1: link[3],
                x2: link[0], y2: link[1],
                shadowColor: '#222', shadowBlur: 3,
                index: -1
            });
    }

    render_router(router) {
        var sliced_width = this.width / 2;
        var center_width = sliced_width + sliced_width / 2;

        var x = center_width;
        var y = this.y_c;
        var font = "12pt";
        var name = router.name;
        var mac_address = "2F:F9:C5:A3:58:87";
        var ip_address = "1.1.1.1" + "/" + 24;

        console.log("router");

        $canvas
            .addLayer({
                type: 'image', source: 'img/router.png',
                groups: [mac_address],
                name: 'router_image' + mac_address, layer: true,
                x: x, y: y,
                width: 100, height: 100, fromCenter: true,
                shadowColor: '#222', shadowBlur: 3,
                rotate: 0,
                data: router,
                cursors: {
                    mouseover: 'pointer',
                    mousedown: 'pointer',
                    mouseup: 'pointer'
                },
                click: function (layer) {
                    console.log(layer);
                }.bind(this)
            })
            .addLayer({
                type: 'rectangle',
                groups: [mac_address],
                name: 'router_info_box' + mac_address,
                fillStyle: '#556080',
                x: x, y: y + 71,
                width: 180, height: 22, fromCenter: true,
                shadowColor: '#222', shadowBlur: 3,
            })
            .addLayer({
                type: 'text',
                groups: [mac_address],
                name: 'router_info_name' + mac_address,
                layer: true,
                fillStyle: '#bcc5e4',
                strokeWidth: 1,
                x: x, y: y + 72,
                fontSize: font, fontFamily: 'Solway, serif',
                text: name
            })
            .drawLayers();

        return [x, y];
    }

    render_client(client, c, n) {
        var sliced_height = (this.height - 50) / c;
        var center_height = sliced_height / 2;

        var sliced_width = this.width / 2;
        var center_width = sliced_width / 2;

        var x = center_width;
        var y = sliced_height * n + center_height;
        var font = "12pt";
        var name = client.name;
        var mac_address = client.interfaces[client.default_interface].mac_address;
        var ip_address = client.interfaces[client.default_interface].ip_address + "/" + client.interfaces[client.default_interface].mask;

        console.log("client");
        $canvas
            .addLayer({
                type: 'image', source: 'img/client.png',
                groups: [mac_address],
                name: 'client_image' + mac_address, layer: true,
                x: x, y: y,
                width: 100, height: 100, fromCenter: true,
                shadowColor: '#222', shadowBlur: 3,
                rotate: 0,
                data: client,
                cursors: {
                    mouseover: 'pointer',
                    mousedown: 'pointer',
                    mouseup: 'pointer'
                },
                click: function (layer) {
                    console.log(layer);
                }.bind(this)
            })
            .addLayer({
                type: 'rectangle',
                groups: [mac_address],
                name: 'client_info_box' + mac_address,
                fillStyle: '#556080',
                x: x, y: y + 90,
                width: 180, height: 60, fromCenter: true,
                shadowColor: '#222', shadowBlur: 3,
            })
            .addLayer({
                type: 'text',
                groups: [mac_address],
                name: 'client_info_name' + mac_address,
                layer: true,
                fillStyle: '#bcc5e4',
                strokeWidth: 1,
                x: x, y: y + 72,
                fontSize: font, fontFamily: 'Solway, serif',
                text: name
            })
            .addLayer({
                type: 'text',
                groups: [mac_address],
                name: 'client_info_ip' + mac_address,
                layer: true,
                fillStyle: '#bcc5e4',
                strokeWidth: 1,
                x: x, y: y + 72 + 18,
                fontSize: font, fontFamily: 'Solway, serif',
                text: ip_address
            })
            .addLayer({
                type: 'text',
                groups: [mac_address],
                name: 'client_info_mac' + mac_address,
                layer: true,
                fillStyle: '#bcc5e4',
                strokeWidth: 1,
                x: x, y: y + 72 + 36,
                fontSize: font, fontFamily: 'Solway, serif',
                text: mac_address
            })
            .drawLayers();

        return [x, y];
    }
}

class Subnetwork {
    constructor(name) {
        this.name = name;
        this.devices = [];
        this.ip_range = null;
        this.existing_ip = [];
        this.existing_ip_count = 1;
        this.router = new Router("Default Router").assign_ip_address(this.generate_ip_address());
    }

    set_ip_range(ip_range) {
        this.ip_range = ip_range;
        return this;
    }

    add_client(name) {
        if (this.ip_range == null) {
            return alert("Please, set IP range for " + this.name + " first.")
        }

        this.devices.push(new Client(name).assign_ip_address(this.generate_ip_address()));
    }

    generate_ip_address() {
        if (this.existing_ip_count >= 255) {
            return alert("Please, free up " + this.name + " or add this device to another subnetwork.")
        }

        return this.existing_ip[this.existing_ip.push(this.generate_ip_address_string()) - 1];
    }

    generate_ip_address_string() {
        return this.ip_range + "." + this.ip_range + "." + this.ip_range + "." + this.existing_ip_count++;
    }
}

class Clientt {
    constructor(name) {
        this.name = name;
        this.interfaces = [];
        this.default_interface = null;

        this.add_interface("Network Adapter", true);
    }

    add_interface(name, is_default = false) {
        this.interfaces.push(new Interface(this.name + ": " + name));
        this.default_interface = (is_default) ? this.interfaces.length - 1 : this.default_interface;
    }

    assign_ip_address(ip) {
        this.interfaces[this.default_interface].add_ip(ip);
        return this;
    }
}

class Routerr {
    constructor(name) {
        this.name = name;
        this.interfaces = [];
        this.forwarding_table = new ForwardingTable();
        this.add_interface("Network Adapter", true);
    }

    add_interface(name, is_default = false) {
        this.interfaces.push(new Interface(this.name + ": " + name));
        this.default_interface = (is_default) ? this.interfaces.length - 1 : this.default_interface;
    }

    assign_ip_address(ip) {
        this.interfaces[this.default_interface].add_ip(ip);
        return this;
    }
}

class ForwardingTable {
    constructor() {
        this.ip_table = {};
    }

    add_ip_forwarding(ip_range, network_interface) {
        this.ip_table[ip_range] = network_interface;
    }
}

class Interfacee {
    constructor(name) {
        this.name = name;
        this.mask = 24;
        this.ip_address = "";
        this.mac_address = "";
        this.add_mac();
    }

    add_ip(ip) {
        this.ip_address = ip;
    }

    add_mac() {
        this.mac_address = "XX:XX:XX:XX:XX:XX".replace(/X/g, function () {
            return "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16))
        });
    }
}

class Server {
    constructor(name) {
        this.name = name;
    }
}























