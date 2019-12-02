function start_application() {

    var global_network = new Network("Global Network");
    var home_subnetwork = new Subnetwork("Home Network");
    global_network.add_subnetwork(home_subnetwork);

    home_subnetwork.add_client("Yoga 920");
    home_subnetwork.add_client("Samsung Galaxy S8");
    home_subnetwork.add_client("iPhone 7");

    console.log(global_network)
}

function update_view() {

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
        this.router = new Router("Default Router");
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

        return this.existing_ip[this.existing_ip.push(this.generate_ip_address_string())];
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
        var new_interface = new Interface(this.name + ": " + name);

        this.interfaces.push(new_interface);
        this.default_interface = (is_default) ? this.interfaces.length - 1 : this.default_interface;
    }

    assign_ip_address(ip) {
        this.interfaces[this.default_interface].add_ip(ip);
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


class Router {
    constructor(name) {
        this.name = name;
        this.interfaces = [];
        this.forwarding_table = new ForwardingTable();
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
























































interact('.draggable')
    .draggable({
        inertia: true,
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'parent',
                endOnly: true
            })
        ],
        autoScroll: true,
        onmove: on_drag_move,
        onend: on_drag_end
    })

function on_drag_move(event) {
    var target = event.target;
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

function on_drag_end(event) {
    console.log('moved a distance of ' +
        (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
            Math.pow(event.pageY - event.y0, 2) | 0))
            .toFixed(2) + 'px');
}