var network_window = $("#network-window");
var open_window_toggle = $("#open-window");
var close_window_toggle = $("#close-window");
var hop_window_content = $("#hops-window-content");

var $canvas = $("#network-canvas");
var network_canvas = $("#network-canvas")[0];
var network_canvas_context = network_canvas.getContext('2d');

function start_application() {
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

class Network {
    constructor(name) {
        this.name = name;
        this.routers = [];
        this.subnetworks = [];
        this.servers = [];
        this.ip_range = 1;
    }

    add_router() {

    }

    add_server() {

    }

    add_subnetwork(subnetwork) {
        this.subnetworks.push(subnetwork.set_ip_range(this.ip_range++));
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

class Client {
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

class Router {
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

class Interface {
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

start_application();
toggle_toolbar(false);
























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