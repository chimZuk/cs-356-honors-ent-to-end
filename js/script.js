var network_window = $("#network-window");
var open_window_toggle = $("#open-window");
var close_window_toggle = $("#close-window");
var hop_window_content = $("#hops-window-content");

var $canvas = $("#network-canvas");
var network_canvas = $("#network-canvas")[0];
var network_canvas_context = network_canvas.getContext('2d');

var app_data = JSON.parse(`{"name":"Internet","devices":[{"coordinates":[334,252],"name":"WiFi Router","type":"r","interfaces":[{"id":0,"ip_address":"125.245.234.17","mac_address":"94:1B:49:1B:CD:27"},{"id":1,"ip_address":"77.224.71.46","mac_address":"51:40:81:59:99:69"},{"id":2,"ip_address":"191.209.116.182","mac_address":"3D:BF:E7:C8:3A:B9"}],"id":0,"id_count":2},{"coordinates":[546,172],"name":"Global Router 1","type":"r","interfaces":[{"id":0,"ip_address":"70.51.163.236","mac_address":"C8:F0:AA:86:9F:48"},{"id":1,"ip_address":"108.111.124.224","mac_address":"DE:4C:F3:C4:CF:92"}],"id":1,"id_count":1},{"coordinates":[550,360],"name":"Global Router 2","type":"r","interfaces":[{"id":0,"ip_address":"18.135.11.69","mac_address":"04:BB:92:0B:29:A5"},{"id":1,"ip_address":"74.172.73.213","mac_address":"D3:82:54:9E:7C:76"}],"id":2,"id_count":1},{"coordinates":[752,402],"name":"Global Router 3","type":"r","interfaces":[{"id":0,"ip_address":"128.30.82.220","mac_address":"FB:4A:CE:E6:47:3F"},{"id":1,"ip_address":"66.224.85.174","mac_address":"F4:32:70:A0:DC:F6"}],"id":3,"id_count":1},{"coordinates":[76,124],"name":"Yoga 920","type":"c","interfaces":[{"id":0,"ip_address":"178.178.192.147","mac_address":"4D:67:33:4B:64:2E"}],"id":4,"id_count":0},{"coordinates":[72,328],"name":"Samsung Galaxy S9","type":"c","interfaces":[{"id":0,"ip_address":"195.198.52.36","mac_address":"21:97:F5:00:2E:5E"}],"id":5,"id_count":0},{"coordinates":[746,143],"name":"DNS Server","type":"s","interfaces":[{"id":0,"ip_address":"21.132.55.35","mac_address":"9F:AD:F1:01:FF:F5"}],"id":6,"id_count":0},{"coordinates":[961,432],"name":"Web Server","type":"s","interfaces":[{"id":0,"ip_address":"240.166.91.135","mac_address":"CB:91:9A:A0:78:F9"}],"id":7,"id_count":0}],"links":[{"id":0,"device_1":{"dev":4,"type":"client","int":0,"ip":"178.178.192.147","mac":"4D:67:33:4B:64:2E"},"device_2":{"dev":0,"type":"router","int":0,"ip":"125.245.234.17","mac":"94:1B:49:1B:CD:27"}},{"id":1,"device_1":{"dev":5,"type":"client","int":0,"ip":"195.198.52.36","mac":"21:97:F5:00:2E:5E"},"device_2":{"dev":0,"type":"router","int":0,"ip":"125.245.234.17","mac":"94:1B:49:1B:CD:27"}},{"id":2,"device_1":{"dev":0,"type":"router","int":1,"ip":"77.224.71.46","mac":"51:40:81:59:99:69"},"device_2":{"dev":1,"type":"router","int":0,"ip":"70.51.163.236","mac":"C8:F0:AA:86:9F:48"}},{"id":3,"device_1":{"dev":0,"type":"router","int":2,"ip":"191.209.116.182","mac":"3D:BF:E7:C8:3A:B9"},"device_2":{"dev":2,"type":"router","int":0,"ip":"18.135.11.69","mac":"04:BB:92:0B:29:A5"}},{"id":4,"device_1":{"dev":6,"type":"server","int":0,"ip":"21.132.55.35","mac":"9F:AD:F1:01:FF:F5"},"device_2":{"dev":1,"type":"router","int":1,"ip":"108.111.124.224","mac":"DE:4C:F3:C4:CF:92"}},{"id":5,"device_1":{"dev":2,"type":"router","int":1,"ip":"74.172.73.213","mac":"D3:82:54:9E:7C:76"},"device_2":{"dev":3,"type":"router","int":0,"ip":"128.30.82.220","mac":"FB:4A:CE:E6:47:3F"}},{"id":6,"device_1":{"dev":7,"type":"server","int":0,"ip":"240.166.91.135","mac":"CB:91:9A:A0:78:F9"},"device_2":{"dev":3,"type":"router","int":1,"ip":"66.224.85.174","mac":"F4:32:70:A0:DC:F6"}}],"ip_list":["125.245.234.17","77.224.71.46","191.209.116.182","70.51.163.236","108.111.124.224","18.135.11.69","74.172.73.213","128.30.82.220","66.224.85.174","178.178.192.147","195.198.52.36","21.132.55.35","240.166.91.135"],"mac_list":["94:1B:49:1B:CD:27","51:40:81:59:99:69","3D:BF:E7:C8:3A:B9","C8:F0:AA:86:9F:48","DE:4C:F3:C4:CF:92","04:BB:92:0B:29:A5","D3:82:54:9E:7C:76","FB:4A:CE:E6:47:3F","F4:32:70:A0:DC:F6","4D:67:33:4B:64:2E","21:97:F5:00:2E:5E","9F:AD:F1:01:FF:F5","CB:91:9A:A0:78:F9"],"id_count":7}`);
var global_network;
var global_network_view;


//---- Adding/Removing devices

function add_device() {
    var new_device_data = $("#new-device-form").serializeArray().map(x => x.value);

    if (new_device_data[0] != "" && new_device_data[1] != "") {

        var device = global_network.add_device(new_device_data[0], new_device_data[1], [100, 100]);

        device.add_interface(global_network.generate_mac(), global_network.generate_ip());
        global_network_view.render_network(global_network);

        close_dialog();
    }
}

function remove_device() {
    var new_device_data = $("#new-device-form").serializeArray().map(x => x.value);

    if (new_device_data[0] != "" && new_device_data[1] != "") {

        var device = global_network.add_device(new_device_data[0], new_device_data[1], [100, 100]);

        device.add_interface(global_network.generate_mac(), global_network.generate_ip());
        global_network_view.render_network(global_network);

        close_dialog();
    }
}

//---- End of Adding/Removing devices


//---- Adding/Removing connections

var connection_add_status;
var selected_interfaces;
var selected_devices;

var connection_remove_status;

function add_connection(layer, is_initial) {
    connection_add_status = (is_initial) ? 0 : connection_add_status + 1;
    if (is_initial) {
        selected_devices = [];
        selected_interfaces = [];
    } else {
        selected_devices.push(layer.data.device);
        selected_interfaces.push(layer.data.interface);
    }

    if (connection_add_status == 2) {
        global_network.setup_connection(selected_devices[0], selected_devices[1], selected_interfaces[0], selected_interfaces[1]);
        global_network_view.render_network(global_network);
    }
}

function remove_connection(link, is_initial) {
    connection_remove_status = (is_initial) ? 0 : connection_remove_status + 1;

    if (connection_remove_status == 1) {
        global_network.links.splice(link, 1);
        global_network_view.render_network(global_network);
    }
}

//---- End of Adding/Removing connections


//---- Hops Start

var request_status;
var request_devices;

function send_request(data, is_initial) {
    request_status = (is_initial) ? 0 : request_status + 1;
    if (is_initial) {
        request_devices = [];
    } else {
        request_devices.push(data);
    }

    if (request_status == 2) {
        console.log(request_devices);
        console.log(global_network.devices);
    }
}

//---- End of Hops Start


//---- Application start

function start_application() {
    let network = new Network("Internet");

    network.ip_list = app_data.ip_list;
    network.mac_list = app_data.mac_list;
    network.links = app_data.links;
    network.id_count = app_data.id_count;

    for (var i in app_data.devices) {
        network.load_device(app_data.devices[i]);
    }

    var network_view = new NetworkRenderer(network);
    network_view.render_network(network);

    global_network = network;
    global_network_view = network_view;
}

function start_applicationn() {
    let network = new Network("Internet");

    var wifi_router = network.add_device("WiFi Router", "r", [100, 100]);
    wifi_router.add_interface(network.generate_mac(), network.generate_ip());
    wifi_router.add_interface(network.generate_mac(), network.generate_ip());
    wifi_router.add_interface(network.generate_mac(), network.generate_ip());

    var global_router_1 = network.add_device("Global Router 1", "r", [100, 100]);
    global_router_1.add_interface(network.generate_mac(), network.generate_ip());
    global_router_1.add_interface(network.generate_mac(), network.generate_ip());

    var global_router_2 = network.add_device("Global Router 2", "r", [100, 100]);
    global_router_2.add_interface(network.generate_mac(), network.generate_ip());
    global_router_2.add_interface(network.generate_mac(), network.generate_ip());

    var global_router_3 = network.add_device("Global Router 3", "r", [100, 100]);
    global_router_3.add_interface(network.generate_mac(), network.generate_ip());
    global_router_3.add_interface(network.generate_mac(), network.generate_ip());

    var laptop = network.add_device("Yoga 920", "c", [100, 100]);
    laptop.add_interface(network.generate_mac(), network.generate_ip());

    var phone_1 = network.add_device("Samsung Galaxy S9", "c", [100, 100]);
    phone_1.add_interface(network.generate_mac(), network.generate_ip());

    var dns_server = network.add_device("DNS Server", "s", [100, 100]);
    dns_server.add_interface(network.generate_mac(), network.generate_ip());

    var web_server = network.add_device("Web Server", "s", [100, 100]);
    web_server.add_interface(network.generate_mac(), network.generate_ip());

    network.setup_connection(laptop, wifi_router, 0, 0);
    network.setup_connection(phone_1, wifi_router, 0, 0);

    network.setup_connection(wifi_router, global_router_1, 1, 0);
    network.setup_connection(wifi_router, global_router_2, 2, 0);

    network.setup_connection(dns_server, global_router_1, 0, 1);
    network.setup_connection(global_router_2, global_router_3, 1, 0);

    network.setup_connection(web_server, global_router_3, 0, 1);

    var network_view = new NetworkRenderer(network);

    global_network = network;
    global_network_view = network_view;
}

//---- End of Application start



class Network {
    constructor(name) {
        this.name = name;
        this.devices = [];
        this.links = [];
        this.ip_list = [];
        this.mac_list = [];
        this.id_count = -1;
    }

    //---- Network Creation Functional

    add_device(name, type, coordinates) {
        return this.devices[this.devices.push(new Device(name, this.generate_id(), type, coordinates)) - 1];
    }

    load_device(device) {
        var new_device = new Device(device.name, device.id, device.type, device.coordinates);

        for (var i in device.interfaces) {
            new_device.load_interface(device.interfaces[i].id, device.interfaces[i].mac_address, device.interfaces[i].ip_address);
        }

        return this.devices[this.devices.push(new_device) - 1]
    }

    setup_connection(device_1, device_2, interface_id_1, interface_id_2) {
        var interface_1 = device_1.interfaces[interface_id_1];
        var interface_2 = device_2.interfaces[interface_id_2];

        this.links.push({
            id: this.links.length,
            device_1: {
                dev: device_1.id,
                type: (device_1.type == "c") ? "client" : (device_1.type == "r" ? "router" : "server"),
                int: interface_1.id,
                ip: interface_1.ip_address,
                mac: interface_1.mac_address,
            },
            device_2: {
                dev: device_2.id,
                type: (device_2.type == "c") ? "client" : (device_2.type == "r" ? "router" : "server"),
                int: interface_2.id,
                ip: interface_2.ip_address,
                mac: interface_2.mac_address
            }
        });
    }

    //---- Sub-Routine Functional

    get_d_by_id(id) {
        for (var i in this.devices) {
            var temp_device = this.devices[i];
            if (temp_device.id == id) {
                return { device: temp_device };
            }
        }
        return { device: null };
    }

    get_d_by_ip(ip_address) {
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

    get_d_by_mac(mac_address) {
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

    generate_id() {
        return ++this.id_count;
    }

    generate_ip() {
        let ip_address = (Math.floor(Math.random() * 255) + 1) + "." + (Math.floor(Math.random() * 255) + 0) + "." + (Math.floor(Math.random() * 255) + 0) + "." + (Math.floor(Math.random() * 255) + 0);
        while (this.ip_list.indexOf(ip_address) != -1) {
            ip_address = (Math.floor(Math.random() * 255) + 1) + "." + (Math.floor(Math.random() * 255) + 0) + "." + (Math.floor(Math.random() * 255) + 0) + "." + (Math.floor(Math.random() * 255) + 0);
        }
        this.ip_list.push(ip_address);
        return ip_address;
    }

    generate_mac() {
        let mac_address = "XX:XX:XX:XX:XX:XX".replace(/X/g, function () { return "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16)) });
        while (this.mac_list.indexOf(mac_address) != -1) {
            mac_address = "XX:XX:XX:XX:XX:XX".replace(/X/g, function () { return "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16)) });
        }
        this.mac_list.push(mac_address);
        return mac_address;
    }
}

class Device {
    constructor(name, id, type, coordinates) {
        this.coordinates = coordinates;
        this.name = name;
        this.type = type;
        this.interfaces = [];
        this.id = id;
        this.id_count = -1;
    }

    add_interface(mac_address, ip_address) {
        this.interfaces.push(new Interface(this.generate_id(), mac_address, ip_address));
    }

    load_interface(id, mac_address, ip_address) {
        this.id_count = (id > this.id_count) ? id : this.id_count;
        this.interfaces.push(new Interface(id, mac_address, ip_address));
    }

    generate_id() {
        return ++this.id_count;
    }
}

class Interface {
    constructor(id, mac_address, ip_address) {
        this.id = id;
        this.ip_address = (ip_address == null) ? "" : ip_address;
        this.mac_address = mac_address;
    }
}


class NetworkRenderer {
    constructor(network) {
        console.log(network);
        this.render_network(network);
        $(window).on('resize', () => this.render_network());
    }

    set_render_data(network) {
        this.network = network;
        this.devices = network.devices;
        this.links = network.links;
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

        for (var device in this.devices) {
            var x = this.devices[device].coordinates[0];
            var y = this.devices[device].coordinates[1];

            this.devices[device].coordinates = [x, y];

            this.render_device(this.devices[device], device, x, y);
        }

        this.render_links();
    }

    render_links() {
        $canvas.removeLayerGroup('links');

        for (var link in this.links) {
            var i1 = $canvas.getLayer('interface_box_' + this.links[link].device_1.dev + '_' + this.links[link].device_1.int);
            var i2 = $canvas.getLayer('interface_box_' + this.links[link].device_2.dev + '_' + this.links[link].device_2.int);

            $canvas.addLayer({
                type: 'line', layer: true,
                name: 'link_' + link, groups: ['common', 'links'], data: { id: this.links[link].id },
                x1: i1.x, y1: i1.y, x2: i2.x, y2: i2.y,
                strokeStyle: '#7383bf', shadowColor: '#222', shadowBlur: 3, strokeWidth: 10, rounded: true, index: 0,
                cursors: { mouseover: 'pointer', mousedown: 'pointer', mouseup: 'pointer' },


                mouseover: function (layer) {
                    $canvas.setLayer(layer, {
                        strokeStyle: '#bcc5e4'
                    });
                },

                mouseout: function (layer) {
                    $canvas.setLayer(layer, {
                        strokeStyle: '#7383bf'
                    });
                },

                click: function (layer) {
                    if (connection_remove_status == 0) {
                        remove_connection(layer.data.id, false)
                    }
                }
            });
        }

        $canvas.drawLayers();
    }

    render_device(data, id, x, y) {
        var type = (data.type == "c") ? "client" : (data.type == "r" ? "router" : "server");
        var font = "12pt";
        var font_family = 'Solway, serif';
        var name = data.name;
        var id = data.id;


        $canvas.addLayer({
            type: 'image', source: 'img/' + type + '.png', layer: true,
            name: 'image_' + id, groups: [id, 'common'], dragGroups: [id], data: data,
            x: x, y: y, width: 100, height: 100, fromCenter: true, index: 2,
            shadowColor: '#222', shadowBlur: 3,
            cursors: { mouseover: 'pointer', mousedown: 'pointer', mouseup: 'pointer' },

            drag: function (layer) {
                this.network.get_d_by_id(data.id).coordinates = [layer.x, layer.y];
                this.render_links();
            }.bind(this),

            dragstop: function (layer) {
                this.network.get_d_by_id(data.id).coordinates = [layer.x, layer.y];
                this.render_links();
            }.bind(this),

            click: function (layer) {
                if (request_status == 0 || request_status == 1) {
                    send_request(layer.data, false)
                }
            }.bind(this)
        });

        $canvas.addLayer({
            type: 'text', text: name, layer: true,
            name: 'name_' + id, groups: [id, 'common'],
            x: x, y: y + 73, fromCenter: true, index: 3,
            fillStyle: '#bcc5e4', shadowColor: '#222', shadowBlur: 3, fontSize: font, fontFamily: font_family
        });

        $canvas.addLayer({
            type: 'rectangle', layer: true,
            name: 'box_' + id, groups: [id, 'common'],
            x: x, y: y + 73, width: $canvas.measureText('name_' + id).width * 1.3, height: 22, fromCenter: true, index: 1,
            fillStyle: '#556080', shadowColor: '#222', shadowBlur: 3
        });

        for (var i in data.interfaces) {
            var temp_interface = data.interfaces[i];
            var n = data.interfaces.length;
            var y_i = i * 30 - (n / 2 * 30) + 15;

            $canvas.addLayer({
                type: 'rectangle', layer: true,
                name: 'interface_box_' + id + '_' + temp_interface.id, groups: [id, 'common'], data: { device: data, interface: temp_interface.id },
                x: x + 48, y: y + y_i, width: 20, height: 20, fromCenter: true, index: 6,
                fillStyle: '#556080', shadowColor: '#222', shadowBlur: 3,
                cursors: { mouseover: 'pointer', mousedown: 'pointer', mouseup: 'pointer' },

                mouseover: function (layer) {
                    $canvas.setLayer(layer, {
                        fillStyle: '#bcc5e4'
                    });
                }.bind(this),

                mouseout: function (layer) {
                    $canvas.setLayer(layer, {
                        fillStyle: '#556080'
                    });
                }.bind(this),

                click: function (layer) {
                    if (connection_add_status == 0 || connection_add_status == 1) {
                        add_connection(layer, false);
                    }
                }.bind(this)
            });
        }

        $canvas.drawLayers();
    }
}

function save_data() {
    console.log(JSON.stringify(global_network));
}

function close_dialog() {
    $("#dialog-container").fadeOut();
    $("#new-device-dialog").fadeOut();
}

function show_dialog(type) {
    $("#dialog-container").fadeIn();

    switch (type) {
        case "nd": {
            $("#new-device-dialog").fadeIn();
            break;
        }
        default: {
            close_dialog();
            break;
        }
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