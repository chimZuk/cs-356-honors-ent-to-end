var network_window = $("#network-window");
var open_window_toggle = $("#open-window");
var close_window_toggle = $("#close-window");
var hop_window_content = $("#hops-window-content");

var $canvas = $("#network-canvas");
var network_canvas = $("#network-canvas")[0];
var network_canvas_context = network_canvas.getContext('2d');

var app_data = JSON.parse(`{"name":"Internet","devices":[{"name":"WiFi Router","index":0,"type":"r","interfaces":[{"id":0,"ip_address":"131.89.165.121","mac_address":"2F:8C:F2:5C:83:45"},{"id":1,"ip_address":"224.15.228.222","mac_address":"B3:F5:77:E6:A6:B8"},{"id":2,"ip_address":"98.158.117.213","mac_address":"CA:A7:35:B5:34:33"}],"forwarding_table":{"239.125.242.41":0,"208.10.89.209":0,"232.142.231.212":1,"137.1.126.174":2},"coordinates":[492.5,410.125]},{"name":"Global Router 1","index":1,"type":"r","interfaces":[{"id":0,"ip_address":"232.142.231.212","mac_address":"99:D4:F8:16:61:4A"},{"id":1,"ip_address":"231.68.91.188","mac_address":"F7:AF:62:F5:D7:E3"}],"forwarding_table":{"224.15.228.222":0,"74.95.102.219":1},"coordinates":[792.5,268.375]},{"name":"Global Router 2","index":2,"type":"r","interfaces":[{"id":0,"ip_address":"137.1.126.174","mac_address":"E1:69:79:71:84:95"},{"id":1,"ip_address":"218.67.176.37","mac_address":"A0:78:F2:47:9E:BE"}],"forwarding_table":{"98.158.117.213":0,"40.99.66.9":1},"coordinates":[655.5,575.625]},{"name":"Global Router 3","index":3,"type":"r","interfaces":[{"id":0,"ip_address":"40.99.66.9","mac_address":"7E:25:C1:68:13:D4"},{"id":1,"ip_address":"80.168.160.31","mac_address":"DD:0F:54:63:6E:E3"}],"forwarding_table":{"218.67.176.37":0,"48.227.211.64":1},"coordinates":[906.5,659.875]},{"name":"Yoga 920","index":4,"type":"c","interfaces":[{"id":0,"ip_address":"239.125.242.41","mac_address":"4A:06:46:39:64:95"}],"forwarding_table":{"131.89.165.121":0},"coordinates":[170.25,259.25]},{"name":"Samsung Galaxy S9","index":5,"type":"c","interfaces":[{"id":0,"ip_address":"208.10.89.209","mac_address":"A4:7D:46:0F:3D:90"}],"forwarding_table":{"131.89.165.121":0},"coordinates":[168.25,530.75]},{"name":"DNS Server","index":6,"type":"s","interfaces":[{"id":0,"ip_address":"74.95.102.219","mac_address":"AE:59:73:6F:59:70"}],"forwarding_table":{"231.68.91.188":0},"coordinates":[1145.75,198.25]},{"name":"Web Server","index":7,"type":"s","interfaces":[{"id":0,"ip_address":"48.227.211.64","mac_address":"CB:B6:8F:CD:E8:D2"}],"forwarding_table":{"80.168.160.31":0},"coordinates":[1158.75,683.75]}],"links":[{"id": 0, "i1_dev":4,"i1_type":"client","i1_int":0,"i1_ip":"239.125.242.41","i1_mac":"4A:06:46:39:64:95","i2_dev":0,"i2_type":"router","i2_int":0,"i2_ip":"131.89.165.121","i2_mac":"2F:8C:F2:5C:83:45"},{"id": 1, "i1_dev":5,"i1_type":"client","i1_int":0,"i1_ip":"208.10.89.209","i1_mac":"A4:7D:46:0F:3D:90","i2_dev":0,"i2_type":"router","i2_int":0,"i2_ip":"131.89.165.121","i2_mac":"2F:8C:F2:5C:83:45"},{"id": 2, "i1_dev":0,"i1_type":"router","i1_int":1,"i1_ip":"224.15.228.222","i1_mac":"B3:F5:77:E6:A6:B8","i2_dev":1,"i2_type":"router","i2_int":0,"i2_ip":"232.142.231.212","i2_mac":"99:D4:F8:16:61:4A"},{"i1_dev":0,"i1_type":"router","i1_int":2,"i1_ip":"98.158.117.213","i1_mac":"CA:A7:35:B5:34:33","i2_dev":2,"i2_type":"router","i2_int":0,"i2_ip":"137.1.126.174","i2_mac":"E1:69:79:71:84:95"},{"id": 3, "i1_dev":6,"i1_type":"server","i1_int":0,"i1_ip":"74.95.102.219","i1_mac":"AE:59:73:6F:59:70","i2_dev":1,"i2_type":"router","i2_int":1,"i2_ip":"231.68.91.188","i2_mac":"F7:AF:62:F5:D7:E3"},{"id": 4, "i1_dev":2,"i1_type":"router","i1_int":1,"i1_ip":"218.67.176.37","i1_mac":"A0:78:F2:47:9E:BE","i2_dev":3,"i2_type":"router","i2_int":0,"i2_ip":"40.99.66.9","i2_mac":"7E:25:C1:68:13:D4"},{"id": 5, "i1_dev":7,"i1_type":"server","i1_int":0,"i1_ip":"48.227.211.64","i1_mac":"CB:B6:8F:CD:E8:D2","i2_dev":3,"i2_type":"router","i2_int":1,"i2_ip":"80.168.160.31","i2_mac":"DD:0F:54:63:6E:E3"}],"links_graph":{"131.89.165.121":["239.125.242.41","208.10.89.209","224.15.228.222","98.158.117.213"],"224.15.228.222":["232.142.231.212","131.89.165.121","98.158.117.213"],"98.158.117.213":["137.1.126.174","131.89.165.121","224.15.228.222"],"232.142.231.212":["224.15.228.222","231.68.91.188"],"231.68.91.188":["74.95.102.219","232.142.231.212"],"137.1.126.174":["98.158.117.213","218.67.176.37"],"218.67.176.37":["40.99.66.9","137.1.126.174"],"40.99.66.9":["218.67.176.37","80.168.160.31"],"80.168.160.31":["48.227.211.64","40.99.66.9"],"239.125.242.41":["131.89.165.121"],"208.10.89.209":["131.89.165.121"],"74.95.102.219":["231.68.91.188"],"48.227.211.64":["80.168.160.31"]},"ip_list":["131.89.165.121","224.15.228.222","98.158.117.213","232.142.231.212","231.68.91.188","137.1.126.174","218.67.176.37","40.99.66.9","80.168.160.31","239.125.242.41","208.10.89.209","74.95.102.219","48.227.211.64"],"mac_list":["2F:8C:F2:5C:83:45","B3:F5:77:E6:A6:B8","CA:A7:35:B5:34:33","99:D4:F8:16:61:4A","F7:AF:62:F5:D7:E3","E1:69:79:71:84:95","A0:78:F2:47:9E:BE","7E:25:C1:68:13:D4","DD:0F:54:63:6E:E3","4A:06:46:39:64:95","A4:7D:46:0F:3D:90","AE:59:73:6F:59:70","CB:B6:8F:CD:E8:D2"]}`);

var global_network;
var global_network_view;

var connection_add_status;
var selected_interfaces;
var selected_devices;

var connection_remove_status;

function add_device() {
    var new_device_data = $("#new-device-form").serializeArray().map(x => x.value);

    if (new_device_data[0] != "" && new_device_data[1] != "") {

        var device;

        switch (new_device_data[1]) {
            case "c": {
                device = global_network.add_client(new_device_data[0]);
                break;
            }
            case "r": {
                device = global_network.add_router(new_device_data[0]);
                break;
            }
            case "s": {
                device = global_network.add_server(new_device_data[0]);
                break;
            }
        }

        device.add_interface(global_network.generate_mac(), global_network.generate_ip());
        global_network_view.render_network(global_network);

        close_dialog();
    }
}

function add_connection(layer, is_initial) {
    connection_add_status = (is_initial) ? 0 : connection_add_status + 1;
    if (is_initial) {
        selected_devices = [];
        selected_interfaces = [];
    } else {
        selected_devices.push(layer.data.device);
        selected_interfaces.push(layer.data.interface);
    }
    console.log(selected_devices);
    console.log(selected_interfaces);
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

function close_dialog() {
    $("#dialog-container").fadeOut();
    $("#new-device-dialog").fadeOut();
}



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




function start_application() {
    let network = new Network("Internet");

    network.ip_list = app_data.ip_list;
    network.mac_list = app_data.mac_list;
    network.links = app_data.links;

    for (var i in app_data.devices) {
        network.add_device(app_data.devices[i]);
    }

    var network_view = new NetworkRenderer(network);
    network_view.render_network(network);

    global_network = network;
    global_network_view = network_view;
}

function start_applicationn() {
    let network = new Network("Internet");

    var wifi_router = network.add_router("WiFi Router");
    wifi_router.add_interface(network.generate_mac(), network.generate_ip());
    wifi_router.add_interface(network.generate_mac(), network.generate_ip());
    wifi_router.add_interface(network.generate_mac(), network.generate_ip());

    var global_router_1 = network.add_router("Global Router 1");
    global_router_1.add_interface(network.generate_mac(), network.generate_ip());
    global_router_1.add_interface(network.generate_mac(), network.generate_ip());

    var global_router_2 = network.add_router("Global Router 2");
    global_router_2.add_interface(network.generate_mac(), network.generate_ip());
    global_router_2.add_interface(network.generate_mac(), network.generate_ip());

    var global_router_3 = network.add_router("Global Router 3");
    global_router_3.add_interface(network.generate_mac(), network.generate_ip());
    global_router_3.add_interface(network.generate_mac(), network.generate_ip());

    var laptop = network.add_client("Yoga 920");
    laptop.add_interface(network.generate_mac(), network.generate_ip());

    var phone_1 = network.add_client("Samsung Galaxy S9");
    phone_1.add_interface(network.generate_mac(), network.generate_ip());

    var dns_server = network.add_server("DNS Server");
    dns_server.add_interface(network.generate_mac(), network.generate_ip());

    var web_server = network.add_server("Web Server");
    web_server.add_interface(network.generate_mac(), network.generate_ip());

    network.setup_connection(laptop, wifi_router, 0, 0);
    network.setup_connection(phone_1, wifi_router, 0, 0);

    network.setup_connection(wifi_router, global_router_1, 1, 0);
    network.setup_connection(wifi_router, global_router_2, 2, 0);

    network.setup_connection(dns_server, global_router_1, 0, 1);
    network.setup_connection(global_router_2, global_router_3, 1, 0);

    network.setup_connection(web_server, global_router_3, 0, 1);

    var network_view = new NetworkRenderer(network);
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

    add_device(device) {
        var new_device = new Device(device.name, device.index, device.type);

        new_device.forwarding_table = device.forwarding_table;
        new_device.coordinates = device.coordinates;

        for (var i in device.interfaces) {
            new_device.add_existing_interface(device.interfaces[i].id, device.interfaces[i].mac_address, device.interfaces[i].ip_address);
        }
        return this.devices[this.devices.push(new_device) - 1]
    }

    add_client(name) {
        return this.devices[this.devices.push(new Device(name, this.devices.length, "c")) - 1];
    }

    add_router(name) {
        return this.devices[this.devices.push(new Device(name, this.devices.length, "r")) - 1];
    }

    add_server(name) {
        return this.devices[this.devices.push(new Device(name, this.devices.length, "s")) - 1];
    }

    setup_connection(device_1, device_2, interface_id_1, interface_id_2) {
        var interface_1 = device_1.interfaces[interface_id_1];
        var interface_2 = device_2.interfaces[interface_id_2];
        device_1.add_connection(interface_2, interface_id_1);
        device_2.add_connection(interface_1, interface_id_2);

        this.add_link(interface_1, device_1, interface_2, device_2);
    }

    add_link(interface_1, device_1, interface_2, device_2) {
        var i1_type = (device_1.type == "c") ? "client" : (device_1.type == "r" ? "router" : "server");
        var i2_type = (device_2.type == "c") ? "client" : (device_2.type == "r" ? "router" : "server");

        this.links.push({
            id: this.links.length,
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
    }
}

class Device {
    constructor(name, index, type) {
        this.coordinates = [100, 100];
        this.name = name;
        this.index = index;
        this.type = type;
        this.interfaces = [];
        this.forwarding_table = {};
    }

    get_type() {
        return this.type;
    }

    add_interface(mac_address, ip_address) {
        this.interfaces.push(new Interface(this.interfaces.length, mac_address, ip_address));
    }

    add_existing_interface(id, mac_address, ip_address) {
        this.interfaces.push(new Interface(id, mac_address, ip_address));
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
        this.position
    }

    get_ip_address() {
        return this.ip_address;
    }

    get_mac_address() {
        return this.mac_address;
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
            var x = this.clients[client].coordinates[0];
            var y = this.clients[client].coordinates[1];

            this.devices[this.clients[client].index].coordinates = [x, y];

            this.render_device(this.clients[client], client, x, y);
        }

        for (var router in this.routers) {
            var x = this.routers[router].coordinates[0];
            var y = this.routers[router].coordinates[1];

            this.devices[this.routers[router].index].coordinates = [x, y];

            this.render_device(this.routers[router], router, x, y);
        }

        for (var server in this.servers) {
            var x = this.servers[server].coordinates[0];
            var y = this.servers[server].coordinates[1];

            this.devices[this.servers[server].index].coordinates = [x, y];

            this.render_device(this.servers[server], server, x, y);
        }

        this.render_links();
    }

    render_links() {
        $canvas.removeLayerGroup('links');

        for (var link in this.links) {
            var c_d = [];

            var i1 = $canvas.getLayer(this.links[link].i1_type + '_interface_box_' + this.links[link].i1_dev + '_' + this.links[link].i1_int);
            var i2 = $canvas.getLayer(this.links[link].i2_type + '_interface_box_' + this.links[link].i2_dev + '_' + this.links[link].i2_int);

            c_d.x1 = i1.x;
            c_d.y1 = i1.y;
            c_d.x2 = i2.x;
            c_d.y2 = i2.y;

            this.render_links_helper(link, c_d);
        }
    }

    render_links_helper(link, c_d) {
        $canvas.addLayer({
            type: 'line',
            groups: ['common', 'links'],
            data: { id: link },
            name: 'link_' + link,
            layer: true,
            strokeStyle: '#7383bf',
            shadowColor: '#222', shadowBlur: 3,
            strokeWidth: 10,
            rounded: true,
            index: 0,
            x1: c_d.x1, y1: c_d.y1,
            x2: c_d.x2, y2: c_d.y2,
            cursors: {
                mouseover: 'pointer',
                mousedown: 'pointer',
                mouseup: 'pointer'
            },
            click: function (layer) {
                if (connection_remove_status == 0) {
                    remove_connection(layer.data.id, false)
                }
            },
            mouseover: function (layer) {
                $(this).setLayer(layer, {
                    strokeStyle: '#bcc5e4'
                });
            },
            mouseout: function (layer) {
                $(this).setLayer(layer, {
                    strokeStyle: '#7383bf'
                });
            }
        });
    }

    render_links_update(device) {
        var i1 = $canvas.getLayer(this.links[link].i1_type + '_interface_box_' + this.links[link].i1_dev + '_' + this.links[link].i1_int);
        var i2 = $canvas.getLayer(this.links[link].i2_type + '_interface_box_' + this.links[link].i2_dev + '_' + this.links[link].i2_int);

        var x1 = i1.x;
        var y1 = i1.y;
        var x2 = i2.x;
        var y2 = i2.y;

        $canvas.setLayer('link_', {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2
        });
        $canvas.drawLayers();
    }

    render_device(data, index, x, y) {
        var type = (data.type == "c") ? "client" : (data.type == "r" ? "router" : "server");
        var font = "12pt";
        var name = data.name;
        var index = data.index;


        $canvas.addLayer({
            type: 'image', source: 'img/' + type + '.png',
            groups: ['common', index],
            dragGroups: [index],
            name: type + '_image' + index, layer: true,
            x: x, y: y,
            width: 100, height: 100, fromCenter: true,
            index: 2,
            shadowColor: '#222', shadowBlur: 3,
            data: data,
            cursors: {
                mouseover: 'pointer',
                mousedown: 'pointer',
                mouseup: 'pointer'
            },
            click: function (layer) {
                if (request_status == 0 || request_status == 1) {
                    send_request(layer.data, false)
                }
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
            groups: ['common', index],
            name: type + '_name_' + index,
            layer: true,
            fillStyle: '#bcc5e4',
            strokeWidth: 1,
            x: x, y: y + 73,
            index: 3,
            fontSize: font, fontFamily: 'Solway, serif',
            text: name
        });

        $canvas.addLayer({
            type: 'rectangle',
            groups: ['common', index],
            name: type + '_name_box_' + index,
            fillStyle: '#556080',
            x: x, y: y + 73,
            index: 1,
            width: $canvas.measureText(type + '_name_' + index).width * 1.3, height: 22, fromCenter: true,
            shadowColor: '#222', shadowBlur: 3
        });

        for (var i in data.interfaces) {
            var temp_interface = data.interfaces[i];

            var n = data.interfaces.length;
            var y_i = i * 30 - (n / 2 * 30) + 15;

            $canvas.addLayer({
                type: 'rectangle',
                groups: ['common', index],
                data: { device: data, interface: temp_interface.id },
                name: type + '_interface_box_' + index + '_' + temp_interface.id,
                fillStyle: '#556080',
                x: x + 48, y: y + y_i,
                width: 20, height: 20, fromCenter: true,
                index: 6,
                shadowColor: '#222', shadowBlur: 3,
                cursors: {
                    mouseover: 'pointer',
                    mousedown: 'pointer',
                    mouseup: 'pointer'
                },
                click: function (layer) {
                    console.log("click")
                    console.log(layer);
                    if (connection_add_status == 0 || connection_add_status == 1) {
                        add_connection(layer, false);
                    }
                }.bind(this),
                mouseover: function (layer) {
                    $(this).setLayer(layer, {
                        fillStyle: '#bcc5e4'
                    });
                },
                mouseout: function (layer) {
                    $(this).setLayer(layer, {
                        fillStyle: '#556080'
                    });
                }
            });
        }

        $canvas.drawLayers();
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