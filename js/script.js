var network_window = $("#network-window");
var open_window_toggle = $("#open-window");
var close_window_toggle = $("#close-window");
var hop_window_content = $("#hops-window-content");

var src_block = $("#src-block");
var dst_block = $("#dst-block");
var src_device = $("#src-device");
var dst_device = $("#dst-device");

var hops_content = $("#hops-content");

var $canvas = $("#network-canvas");
var network_canvas = $("#network-canvas")[0];
var network_canvas_context = network_canvas.getContext('2d');


var app_data = JSON.parse(`{"name":"Internet","devices":[{"coordinates":[260,260],"name":"WiFi Router","type":"r","interfaces":[{"id":0,"ip_address":"164.79.205.147","mac_address":"6A:07:5F:34:EF:C6","side":-1},{"id":1,"ip_address":"224.158.208.55","mac_address":"82:C2:ED:7E:CF:FF","side":1},{"id":2,"ip_address":"42.103.183.108","mac_address":"BE:18:19:20:1B:63","side":1}],"id":0,"id_count":2},{"coordinates":[640,140],"name":"Global Router 1","type":"r","interfaces":[{"id":0,"ip_address":"96.175.199.7","mac_address":"FC:28:26:98:C5:52","side":-1},{"id":1,"ip_address":"226.66.149.205","mac_address":"F7:40:46:E2:85:8D","side":1}],"id":1,"id_count":1},{"coordinates":[420,380],"name":"Global Router 2","type":"r","interfaces":[{"id":0,"ip_address":"217.15.68.179","mac_address":"E9:9D:29:EE:17:98","side":-1},{"id":1,"ip_address":"235.25.235.55","mac_address":"81:2F:5F:0A:13:DA","side":1},{"id":2,"ip_address":"133.74.11.2","mac_address":"46:A3:35:08:7A:A2","side":1}],"id":2,"id_count":2},{"coordinates":[640,300],"name":"Global Router 3","type":"r","interfaces":[{"id":0,"ip_address":"112.70.136.55","mac_address":"91:CE:CB:0D:D4:B9","side":-1},{"id":1,"ip_address":"191.118.172.102","mac_address":"C1:CA:14:B9:A3:49","side":1}],"id":3,"id_count":1},{"coordinates":[100,380],"name":"Yoga 920","type":"c","interfaces":[{"id":0,"ip_address":"48.31.169.123","mac_address":"D3:3D:5E:35:BE:BC","side":1}],"id":4,"id_count":0},{"coordinates":[100,140],"name":"Samsung Galaxy S9","type":"c","interfaces":[{"id":0,"ip_address":"145.74.21.64","mac_address":"55:80:65:C1:9A:D1","side":1}],"id":5,"id_count":0},{"coordinates":[860,140],"name":"DNS Server","type":"s","interfaces":[{"id":0,"ip_address":"226.96.151.15","mac_address":"DC:6F:79:3C:6F:3A","side":-1}],"id":6,"id_count":0},{"coordinates":[860,300],"name":"Web Server","type":"s","interfaces":[{"id":0,"ip_address":"75.178.145.158","mac_address":"05:32:E3:2D:AA:E5","side":-1}],"id":7,"id_count":0},{"coordinates":[640,460],"name":"Global Router 4","type":"r","interfaces":[{"id":0,"ip_address":"226.3.15.86","mac_address":"4A:C4:A7:84:75:CF","side":-1},{"id":1,"ip_address":"116.113.43.82","mac_address":"AE:F9:C6:81:58:3E","side":1}],"id":15,"id_count":1},{"coordinates":[860,460],"name":"Gaming Server","type":"s","interfaces":[{"id":0,"ip_address":"28.187.46.243","mac_address":"2C:34:A4:E7:CF:66","side":-1}],"id":17,"id_count":0}],"links":[{"id":8,"device_1":{"dev":4,"type":"client","int":0,"ip":"48.31.169.123","mac":"D3:3D:5E:35:BE:BC"},"device_2":{"dev":0,"type":"router","int":0,"ip":"164.79.205.147","mac":"6A:07:5F:34:EF:C6"}},{"id":9,"device_1":{"dev":5,"type":"client","int":0,"ip":"145.74.21.64","mac":"55:80:65:C1:9A:D1"},"device_2":{"dev":0,"type":"router","int":0,"ip":"164.79.205.147","mac":"6A:07:5F:34:EF:C6"}},{"id":10,"device_1":{"dev":0,"type":"router","int":1,"ip":"224.158.208.55","mac":"82:C2:ED:7E:CF:FF"},"device_2":{"dev":1,"type":"router","int":0,"ip":"96.175.199.7","mac":"FC:28:26:98:C5:52"}},{"id":11,"device_1":{"dev":0,"type":"router","int":2,"ip":"42.103.183.108","mac":"BE:18:19:20:1B:63"},"device_2":{"dev":2,"type":"router","int":0,"ip":"217.15.68.179","mac":"E9:9D:29:EE:17:98"}},{"id":12,"device_1":{"dev":6,"type":"server","int":0,"ip":"226.96.151.15","mac":"DC:6F:79:3C:6F:3A"},"device_2":{"dev":1,"type":"router","int":1,"ip":"226.66.149.205","mac":"F7:40:46:E2:85:8D"}},{"id":13,"device_1":{"dev":2,"type":"router","int":1,"ip":"235.25.235.55","mac":"81:2F:5F:0A:13:DA"},"device_2":{"dev":3,"type":"router","int":0,"ip":"112.70.136.55","mac":"91:CE:CB:0D:D4:B9"}},{"id":14,"device_1":{"dev":7,"type":"server","int":0,"ip":"75.178.145.158","mac":"05:32:E3:2D:AA:E5"},"device_2":{"dev":3,"type":"router","int":1,"ip":"191.118.172.102","mac":"C1:CA:14:B9:A3:49"}},{"id":16,"device_1":{"dev":2,"type":"router","int":2,"ip":"133.74.11.2","mac":"46:A3:35:08:7A:A2"},"device_2":{"dev":15,"type":"router","int":0,"ip":"226.3.15.86","mac":"4A:C4:A7:84:75:CF"}},{"id":18,"device_1":{"dev":15,"type":"router","int":1,"ip":"116.113.43.82","mac":"AE:F9:C6:81:58:3E"},"device_2":{"dev":17,"type":"server","int":0,"ip":"28.187.46.243","mac":"2C:34:A4:E7:CF:66"}}],"ip_list":["164.79.205.147","224.158.208.55","42.103.183.108","96.175.199.7","226.66.149.205","217.15.68.179","235.25.235.55","112.70.136.55","191.118.172.102","48.31.169.123","145.74.21.64","226.96.151.15","75.178.145.158","133.74.11.2","226.3.15.86","116.113.43.82","28.187.46.243"],"mac_list":["6A:07:5F:34:EF:C6","82:C2:ED:7E:CF:FF","BE:18:19:20:1B:63","FC:28:26:98:C5:52","F7:40:46:E2:85:8D","E9:9D:29:EE:17:98","81:2F:5F:0A:13:DA","91:CE:CB:0D:D4:B9","C1:CA:14:B9:A3:49","D3:3D:5E:35:BE:BC","55:80:65:C1:9A:D1","DC:6F:79:3C:6F:3A","05:32:E3:2D:AA:E5","46:A3:35:08:7A:A2","4A:C4:A7:84:75:CF","AE:F9:C6:81:58:3E","2C:34:A4:E7:CF:66"],"id_count":18}`);

var global_network;
var global_network_view;


//---- Adding/Removing devices

var device_remove_status;

function add_device() {
    var new_device_data = $("#new-device-form").serializeArray().map(x => x.value);

    if (new_device_data[0] != "" && new_device_data[1] != "") {
        global_network.add_device(new_device_data[0], new_device_data[1], [100, 100]);
        global_network_view.render_network(global_network);
        close_dialog();
    }
}

function remove_device(layer, is_initial) {
    device_remove_status = (is_initial) ? 0 : device_remove_status + 1;

    if (device_remove_status == 1) {
        global_network.remove_device(layer.data);
        global_network_view.render_network(global_network);
    }
}

//---- End of Adding/Removing devices


//---- Adding/Removing interfaces

var interface_add_status;

var interface_remove_status;

function add_interface(layer, side, is_initial) {
    interface_add_status = (is_initial) ? 0 : interface_add_status + 1;

    if (interface_add_status == 1) {
        global_network.add_interface(layer.data, side);
        global_network_view.render_network(global_network);
    }
}

function remove_interface(layer, is_initial) {
    interface_remove_status = (is_initial) ? 0 : interface_remove_status + 1;

    if (interface_remove_status == 1) {
        global_network.remove_interface(layer.data.device, layer.data.interface);
        global_network_view.render_network(global_network);
    }
}

//---- End of Adding/Removing interfaces


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
        global_network.add_connection(selected_devices[0], selected_devices[1], selected_interfaces[0], selected_interfaces[1]);
        global_network_view.render_network(global_network);
    }
}

function remove_connection(link, is_initial) {
    connection_remove_status = (is_initial) ? 0 : connection_remove_status + 1;
    if (connection_remove_status == 1) {
        global_network.remove_connection(link)
        global_network_view.render_network(global_network);
    }
}

//---- End of Adding/Removing connections


//---- Hops Start

var request_status;
var request_devices;

function send_request(layer, is_initial) {
    request_status = (is_initial) ? 0 : request_status + 1;
    if (is_initial) {
        global_network_view.render_network(global_network);
        request_devices = [];
        src_block.fadeIn();
    } else {
        request_devices.push(layer.data);
        if (request_status == 1) {
            src_device.html(layer.data.name);
        } else {
            dst_device.html(layer.data.name);
        }
        dst_block.fadeIn();
    }

    if (request_status == 2) {
        process_hops(request_devices);
        src_block.fadeOut(function () {
            dst_block.fadeOut(function () {
                src_device.html("");
                dst_device.html("");
            });
        });
    }
}

var last_request;
var last_response;
var last_data;

function process_hops(data) {
    toggle_toolbar(true);
    console.log(data);
    var src = data[0].interfaces[data[0].forwarding_table[data[1].interfaces[0].ip_address].interface_id];
    var dst = data[1].interfaces[data[1].forwarding_table[data[0].interfaces[0].ip_address].interface_id];

    last_request = global_network.start_request(src.ip_address, dst.ip_address);
    last_response = global_network.start_request(dst.ip_address, src.ip_address);
    last_data = data;
    console.log(last_request);
    console.log(last_response);

    change_view(last_view);
}

function table_view() {
    var html = "";
    var font = "12pt";
    var font_family = 'Solway, serif';

    html += "<div style='float: left;' class='hops'>";
    html += `<h4>From ` + last_data[0].name + ` to ` + last_data[1].name + `</h4>`;
    html += "<h4>Request:</h4>";
    html += "<table cellspacing='0'>";

    for (var i in last_request) {
        var hop = last_request[i];

        $canvas.setLayer('link_' + hop.link.id, {
            strokeStyle: '#774c5d',
            mouseover: function () { },

            mouseout: function () { },

            click: function () { }
        });

        $canvas.setLayer('interface_box_' + hop.dev_src.id + '_' + hop.int_src.id, {
            fillStyle: '#774c5d',
            mouseover: function () { },

            mouseout: function () { },

            click: function () { }
        });

        $canvas.setLayer('interface_box_' + hop.dev_dst.id + '_' + hop.int_dst.id, {
            fillStyle: '#774c5d',
            mouseover: function () { },

            mouseout: function () { },

            click: function () { }
        });

        var layer = $canvas.getLayer('interface_box_' + hop.dev_src.id + '_' + hop.int_src.id)
        var id = hop.mac_src;

        $canvas.addLayer({
            type: 'text', text: layer.data.interface_data.mac_address, layer: true,
            name: 'popup_' + id, groups: ['common', 'popup'],
            x: layer.x, y: layer.y - 30, fromCenter: true,
            fillStyle: '#bcc5e4', shadowColor: '#222', shadowBlur: 3, fontSize: font, fontFamily: font_family
        });

        $canvas.addLayer({
            type: 'rectangle', layer: true,
            name: 'popup_body_' + id, groups: ['common', 'popup'],
            x: layer.x, y: layer.y - 30, width: $canvas.measureText('popup_' + id).width * 1.3, height: 22, fromCenter: true, index: -1,
            fillStyle: '#774c5d', shadowColor: '#222', shadowBlur: 3
        });

        $canvas.addLayer({
            type: 'text', text: layer.data.interface_data.ip_address, layer: true,
            name: 'popup_1_' + id, groups: ['popup'],
            x: layer.x, y: layer.y - 55, fromCenter: true,
            fillStyle: '#bcc5e4', shadowColor: '#222', shadowBlur: 3, fontSize: font, fontFamily: font_family
        });

        $canvas.addLayer({
            type: 'rectangle', layer: true,
            name: 'popup_1_body_' + id, groups: ['common', 'popup'],
            x: layer.x, y: layer.y - 55, width: $canvas.measureText('popup_1_' + id).width * 1.3, height: 22, fromCenter: true, index: -1,
            fillStyle: '#774c5d', shadowColor: '#222', shadowBlur: 3
        });

        layer = $canvas.getLayer('interface_box_' + hop.dev_dst.id + '_' + hop.int_dst.id)
        id = hop.mac_dst;

        $canvas.addLayer({
            type: 'text', text: layer.data.interface_data.mac_address, layer: true,
            name: 'popup_' + id, groups: ['common', 'popup'],
            x: layer.x, y: layer.y + 30, fromCenter: true,
            fillStyle: '#bcc5e4', shadowColor: '#222', shadowBlur: 3, fontSize: font, fontFamily: font_family
        });

        $canvas.addLayer({
            type: 'rectangle', layer: true,
            name: 'popup_body_' + id, groups: ['common', 'popup'],
            x: layer.x, y: layer.y + 30, width: $canvas.measureText('popup_' + id).width * 1.3, height: 22, fromCenter: true, index: -1,
            fillStyle: '#774c5d', shadowColor: '#222', shadowBlur: 3
        });

        $canvas.addLayer({
            type: 'text', text: layer.data.interface_data.ip_address, layer: true,
            name: 'popup_1_' + id, groups: ['popup'],
            x: layer.x, y: layer.y + 55, fromCenter: true,
            fillStyle: '#bcc5e4', shadowColor: '#222', shadowBlur: 3, fontSize: font, fontFamily: font_family
        });

        $canvas.addLayer({
            type: 'rectangle', layer: true,
            name: 'popup_1_body_' + id, groups: ['common', 'popup'],
            x: layer.x, y: layer.y + 55, width: $canvas.measureText('popup_1_' + id).width * 1.3, height: 22, fromCenter: true, index: -1,
            fillStyle: '#774c5d', shadowColor: '#222', shadowBlur: 3
        });

        html += "<tr>"
        html += "<td rowspan='2'>Hop " + (Number(i) + Number(1)) + "</td>"
        html += "<td>SRC IP</td>"
        html += "<td>" + hop.ip_src + "</td>"
        html += "<td>SRC MAC</td>"
        html += "<td>" + hop.mac_src + "</td>"
        html += "</tr>"

        html += "<tr>"
        html += "<td>DST IP</td>"
        html += "<td>" + hop.ip_dst + "</td>"
        html += "<td>DST MAC</td>"
        html += "<td>" + hop.mac_dst + "</td>"
        html += "</tr>"
    }

    html += "</table>";
    html += "</div>";

    html += "<div style='float: left;' class='hops'>";
    html += `<h4>From ` + last_data[1].name + ` to ` + last_data[0].name + `</h4>`;
    html += "<h4>Response:</h4>";
    html += "<table>";

    for (var i in last_response) {
        var hop = last_response[i];

        html += "<tr>"
        html += "<td rowspan='2'>Hop " + (Number(i) + Number(1)) + "</td>"
        html += "<td>SRC IP</td>"
        html += "<td>" + hop.ip_src + "</td>"
        html += "<td>SRC MAC</td>"
        html += "<td>" + hop.mac_src + "</td>"
        html += "</tr>"

        html += "<tr>"
        html += "<td>DST IP</td>"
        html += "<td>" + hop.ip_dst + "</td>"
        html += "<td>DST MAC</td>"
        html += "<td>" + hop.mac_dst + "</td>"
        html += "</tr>"
    }

    html += "</table>";
    html += "</div>";

    hops_content.html(html);
    $canvas.drawLayers();
}

function step_view() {
    var html = "";

    html += "<div style='float: left;' class='hops'>";
    html += `<h4>Frsdfsdom ` + last_data[0].name + ` to ` + last_data[1].name + `</h4>`;
    html += "<h4>Request:</h4>";
    html += "<table cellspacing='0'>";
    for (var i in last_request) {
        var hop = last_request[i];

        html += "<tr>"
        html += "<td rowspan='2'>Hop " + (Number(i) + Number(1)) + "</td>"
        html += "<td>SRC IP</td>"
        html += "<td>" + hop.ip_src + "</td>"
        html += "<td>SRC MAC</td>"
        html += "<td>" + hop.mac_src + "</td>"
        html += "</tr>"

        html += "<tr>"
        html += "<td>DST IP</td>"
        html += "<td>" + hop.ip_dst + "</td>"
        html += "<td>DST MAC</td>"
        html += "<td>" + hop.mac_dst + "</td>"
        html += "</tr>"
    }

    html += "</table>";
    html += "</div>";

    html += "<div style='float: left;' class='hops'>";
    html += `<h4>From ` + last_data[1].name + ` to ` + last_data[0].name + `</h4>`;
    html += "<h4>Response:</h4>";
    html += "<table>";
    for (var i in last_response) {
        var hop = last_response[i];

        html += "<tr>"
        html += "<td rowspan='2'>Hop " + (Number(i) + Number(1)) + "</td>"
        html += "<td>SRC IP</td>"
        html += "<td>" + hop.ip_src + "</td>"
        html += "<td>SRC MAC</td>"
        html += "<td>" + hop.mac_src + "</td>"
        html += "</tr>"

        html += "<tr>"
        html += "<td>DST IP</td>"
        html += "<td>" + hop.ip_dst + "</td>"
        html += "<td>DST MAC</td>"
        html += "<td>" + hop.mac_dst + "</td>"
        html += "</tr>"
    }

    html += "</table>";
    html += "</div>";

    hops_content.html(html);
}

//---- End of Hops Start

var last_view = 1;
//---- Application start
function change_view(choice = last_view) {
    switch (choice) {
        case 1: {
            table_view();
            break;
        }
        case 2: {
            step_view();
            break;
        }
    }
}

function start_application(choice) {
    switch (choice) {
        case 1: {
            small_topology();
            break;
        }
        case 2: {
            huge_topology();
            break;
        }
    }
}

function huge_topology() {
    let network = new Network("Internet");

    var wifi_router = network.add_device("WiFi Router", "r", [525, 300]);
    wifi_router.add_interface(network.generate_mac(), null, -1);
    wifi_router.add_interface(network.generate_mac(), null, 1);
    wifi_router.add_interface(network.generate_mac(), null, 1);

    var homework_router = network.add_device("Homework Router", "r", [1275, 200]);
    homework_router.add_interface(network.generate_mac(), null, -1);
    homework_router.add_interface(network.generate_mac(), null, 1);

    var global_router_1 = network.add_device("Global Router 1", "r", [850, 200]);
    global_router_1.add_interface(network.generate_mac(), null, -1);
    global_router_1.add_interface(network.generate_mac(), null, 1);

    var global_router_2 = network.add_device("Global Router 2", "r", [850, 400]);
    global_router_2.add_interface(network.generate_mac(), null, -1);
    global_router_2.add_interface(network.generate_mac(), null, 1);

    var laptop = network.add_device("Yoga 920", "c", [100, 100]);
    laptop.add_interface(network.generate_mac(), null, 1);

    var phone_1 = network.add_device("Samsung Galaxy S9", "c", [100, 300]);
    phone_1.add_interface(network.generate_mac(), null, 1);

    var phone_2 = network.add_device("iPhone 7", "c", [100, 500]);
    phone_2.add_interface(network.generate_mac(), null, 1);

    var phone_3 = network.add_device("iPhone X", "c", [1800, 100]);
    phone_3.add_interface(network.generate_mac(), null, -1);

    var phone_4 = network.add_device("Xiaomi Redmi S2", "c", [1800, 300]);
    phone_4.add_interface(network.generate_mac(), null, -1);

    var server = network.add_device("Video Server", "s", [1275, 400]);
    server.add_interface(network.generate_mac(), null, -1);

    network.add_connection(global_router_2, wifi_router, 0, 2);
    network.add_connection(server, global_router_2, 0, 1);

    network.add_connection(global_router_1, wifi_router, 0, 1);
    network.add_connection(global_router_1, homework_router, 1, 0);

    network.add_connection(phone_1, wifi_router, 0, 0);
    network.add_connection(laptop, wifi_router, 0, 0);
    network.add_connection(phone_2, wifi_router, 0, 0);

    network.add_connection(phone_3, homework_router, 0, 1);
    network.add_connection(phone_4, homework_router, 0, 1);


    var network_view = new NetworkRenderer(network);

    global_network = network;
    global_network_view = network_view;
}

function small_topology() {
    let network = new Network("Internet");

    var wifi_router = network.add_device("WiFi Router", "r", [500, 300]);
    wifi_router.add_interface(network.generate_mac(), null, -1);
    wifi_router.add_interface(network.generate_mac(), null, 1);

    var global_router_1 = network.add_device("Global Router 1", "r", [750, 300]);
    global_router_1.add_interface(network.generate_mac(), null, -1);
    global_router_1.add_interface(network.generate_mac(), null, 1);

    var laptop = network.add_device("Yoga 920", "c", [250, 100]);
    laptop.add_interface(network.generate_mac(), null, 1);
    network.add_connection(laptop, wifi_router, 0, 0);

    var phone_1 = network.add_device("Samsung Galaxy S9", "c", [250, 300]);
    phone_1.add_interface(network.generate_mac(), null, 1);
    network.add_connection(phone_1, wifi_router, 0, 0);

    var phone_2 = network.add_device("iPhone 7", "c", [250, 500]);
    phone_2.add_interface(network.generate_mac(), null, 1);
    network.add_connection(phone_2, wifi_router, 0, 0);

    network.add_connection(global_router_1, wifi_router, 0, 1);

    var server = network.add_device("Video Server", "s", [1000, 300]);
    server.add_interface(network.generate_mac(), null, -1);
    network.add_connection(server, global_router_1, 0, 1);

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
        this.subnet_list = [];
        this.ip_list = [];
        this.mac_list = [];
        this.id_count = -1;
    }

    start_request(start, end) {
        var hops = [];
        var start_data = this.get_d_by_ip(start);
        var start_device = start_data.device;
        var temp_link = this.get_l_by_id(start_device.forwarding_table[end].link_id);

        var src = (temp_link.device_1.dev == start_device.id) ? {
            mac: temp_link.device_1.mac,
            ip: temp_link.device_1.ip,
            dev: temp_link.device_1.dev
        } : {
                mac: temp_link.device_2.mac,
                ip: temp_link.device_2.ip,
                dev: temp_link.device_2.dev
            };

        var dst = (temp_link.device_1.dev != start_device.id) ? {
            mac: temp_link.device_1.mac,
            ip: temp_link.device_1.ip,
            dev: temp_link.device_1.dev
        } : {
                mac: temp_link.device_2.mac,
                ip: temp_link.device_2.ip,
                dev: temp_link.device_2.dev
            };

        hops.push({
            ip_src: start,
            ip_dst: end,
            mac_src: src.mac,
            mac_dst: dst.mac,
            dev_src: this.get_d_by_mac(src.mac).device,
            dev_dst: this.get_d_by_mac(dst.mac).device,
            int_src: this.get_d_by_mac(src.mac).interface_d,
            int_dst: this.get_d_by_mac(dst.mac).interface_d,
            link: temp_link
        });

        while (temp_link != null) {
            start_device = (temp_link.device_1.dev != start_device.id) ? this.get_d_by_id(temp_link.device_1.dev) : this.get_d_by_id(temp_link.device_2.dev);
            temp_link = this.get_l_by_id(start_device.forwarding_table[end].link_id);


            if (temp_link != null) {
                src = (temp_link.device_1.dev == start_device.id) ? {
                    mac: temp_link.device_1.mac,
                    ip: temp_link.device_1.ip,
                    dev: temp_link.device_1.dev
                } : {
                        mac: temp_link.device_2.mac,
                        ip: temp_link.device_2.ip,
                        dev: temp_link.device_2.dev
                    };

                dst = (temp_link.device_1.dev != start_device.id) ? {
                    mac: temp_link.device_1.mac,
                    ip: temp_link.device_1.ip,
                    dev: temp_link.device_1.dev
                } : {
                        mac: temp_link.device_2.mac,
                        ip: temp_link.device_2.ip,
                        dev: temp_link.device_2.dev
                    };

                hops.push({
                    ip_src: start,
                    ip_dst: end,
                    mac_src: src.mac,
                    mac_dst: dst.mac,
                    dev_src: this.get_d_by_mac(src.mac).device,
                    dev_dst: this.get_d_by_mac(dst.mac).device,
                    int_src: this.get_d_by_mac(src.mac).interface_d,
                    int_dst: this.get_d_by_mac(dst.mac).interface_d,
                    link: temp_link
                });
            }
        }

        return hops;
    }

    //---- Network Creation Functional

    add_device(name, type, coordinates) {
        return this.devices[this.devices.push(new Device(name, this.generate_id(), type, coordinates)) - 1];
    }

    load_device(device) {
        var new_device = new Device(device.name, device.id, device.type, device.coordinates);

        for (var i in device.interfaces) {
            new_device.load_interface(device.interfaces[i].id, device.interfaces[i].mac_address, device.interfaces[i].ip_address, device.interfaces[i].side);
        }

        return this.devices[this.devices.push(new_device) - 1]
    }

    remove_device(device) {
        for (var i in this.devices) {
            if (this.devices[i].id == device.id) {
                for (var j = 0; j < this.devices[i].interfaces.length; j++) {
                    for (var k = 0; k < this.links.length; k++) {
                        if (this.links[k].device_1.dev == device.id && this.links[k].device_1.int == this.devices[i].interfaces[j].id ||
                            this.links[k].device_2.dev == device.id && this.links[k].device_2.int == this.devices[i].interfaces[j].id) {
                            this.links.splice(k, 1);
                            k--;
                        }
                    }
                    this.devices[i].interfaces.splice(j, 1);
                    j--;
                }
                this.devices.splice(i, 1);
                break;
            }
        }
    }

    add_interface(device, side) {
        for (var i in this.devices) {
            if (this.devices[i].id == device.id) {
                this.devices[i].add_interface(this.generate_mac(), null, side);
                break;
            }
        }
    }

    remove_interface(device, interface_id) {
        for (var i in this.devices) {
            if (this.devices[i].id == device.id) {
                for (var j in this.devices[i].interfaces) {
                    if (this.devices[i].interfaces[j].id == interface_id) {
                        this.devices[i].interfaces.splice(j, 1);
                        break;
                    }
                }
            }
        }

        for (var i = 0; i < this.links.length; i++) {
            if (this.links[i].device_1.dev == device.id && this.links[i].device_1.int == interface_id ||
                this.links[i].device_2.dev == device.id && this.links[i].device_2.int == interface_id) {
                this.links.splice(i, 1);
                i--;
            }
        }
    }

    add_connection(device_1, device_2, interface_id_1, interface_id_2) {
        var interface_1 = device_1.get_i_by_id(interface_id_1);
        var interface_2 = device_2.get_i_by_id(interface_id_2);

        var subnet;
        var ip_1;
        var ip_2;
        var d1_ip;
        var d2_ip;

        if (interface_1.subnet_id) {
            subnet = this.get_s_by_id(interface_1.subnet_id);
            ip_1 = interface_1.ip_address;
            ip_2 = this.generate_subnet_ip(subnet);
            d1_ip = ip_1;
            d2_ip = ip_2;
        } else {
            if (interface_2.subnet_id) {
                subnet = this.get_s_by_id(interface_2.subnet_id);
                ip_2 = interface_2.ip_address;
                ip_1 = this.generate_subnet_ip(subnet);
                d1_ip = ip_1;
                d2_ip = ip_2;
            } else {
                subnet = this.generate_subnet(24);
                ip_1 = this.generate_subnet_ip(subnet);
                ip_2 = this.generate_subnet_ip(subnet);
                if (device_1.type == "r") {
                    d1_ip = ip_1;
                    d2_ip = ip_2;
                } else {
                    d1_ip = ip_2;
                    d2_ip = ip_1;
                }
            }
        }

        if (!ip_1 || !ip_2) {
            console.log("Ran out of IP's");
            return 0;
        }

        var device_1_ip = device_1.set_ip_address(interface_id_1, d1_ip, subnet.id);
        var device_2_ip = device_2.set_ip_address(interface_id_2, d2_ip, subnet.id);

        var link = {
            id: this.generate_id(),
            subnet: subnet,
            device_1: {
                dev: device_1.id,
                type: (device_1.type == "c") ? "client" : (device_1.type == "r" ? "router" : "server"),
                int: interface_1.id,
                ip: device_1_ip,
                mac: interface_1.mac_address,
            },
            device_2: {
                dev: device_2.id,
                type: (device_2.type == "c") ? "client" : (device_2.type == "r" ? "router" : "server"),
                int: interface_2.id,
                ip: device_2_ip,
                mac: interface_2.mac_address
            }
        }

        this.links.push(link);

        device_1.forwarding_table[device_2_ip] = {
            interface_id: interface_id_1,
            link_id: link.id
        };

        device_2.forwarding_table[device_1_ip] = {
            interface_id: interface_id_2,
            link_id: link.id
        };

        for (var i in device_1.forwarding_table) {
            var temp_interface = device_2.get_i_by_ip(i);

            if (temp_interface == null) {
                device_2.forwarding_table[i] = {
                    interface_id: interface_id_2,
                    link_id: link.id
                };
            } else {
                device_2.forwarding_table[i] = {
                    interface_id: interface_id_2,
                    link_id: null
                };
            }
        }

        for (var i in device_2.forwarding_table) {
            var temp_interface = device_1.get_i_by_ip(i);

            if (temp_interface == null) {
                device_1.forwarding_table[i] = {
                    interface_id: interface_id_1,
                    link_id: link.id
                };
            } else {
                device_1.forwarding_table[i] = {
                    interface_id: interface_id_1,
                    link_id: null
                };
            }
        }

        var visited = [];
        var links = [];

        for (var i in device_1.forwarding_table) {
            if (links.indexOf(device_1.forwarding_table[i].link_id) == -1 && device_1.forwarding_table[i].link_id != null) {
                links.push(device_1.forwarding_table[i].link_id);
            }
        }

        for (var i in links) {
            if (visited.indexOf(links[i]) == -1) {
                visited.push(links[i]);
                var link = this.get_l_by_id(links[i]);
                this.update_forwarding_tables(device_1, link, visited);
            }
        }

        links = [];

        for (var i in device_2.forwarding_table) {
            if (links.indexOf(device_2.forwarding_table[i].link_id) == -1 && device_2.forwarding_table[i].link_id != null) {
                links.push(device_2.forwarding_table[i].link_id);
            }
        }
        for (var i in links) {
            if (visited.indexOf(links[i]) == -1) {
                visited.push(links[i]);
                var link = this.get_l_by_id(links[i]);
                this.update_forwarding_tables(device_2, link, visited);
            }
        }
    }

    remove_connection(link) {
        for (var i = 0; i < this.links.length; i++) {
            if (this.links[i].id == link) {
                this.links.splice(i, 1);
                break;
            }
        }
    }

    update_forwarding_tables(device, link, visited) {
        var temp_device_info = Number(link.device_1.dev) != Number(device.id) ? link.device_1 : link.device_2;
        var temp_device = this.get_d_by_id(temp_device_info.dev);

        for (var i in device.forwarding_table) {
            if (temp_device.get_i_by_ip(i) == null && !temp_device.forwarding_table[i]) {
                temp_device.forwarding_table[i] = {
                    interface_id: temp_device_info.int,
                    link_id: link.id
                }
            }
        }

        var links = [];

        for (var i in temp_device.forwarding_table) {
            if (links.indexOf(temp_device.forwarding_table[i].link_id) == -1 && temp_device.forwarding_table[i].link_id != null) {
                links.push(temp_device.forwarding_table[i].link_id);
            }
        }

        for (var i in links) {
            if (visited.indexOf(links[i]) == -1) {
                visited.push(links[i]);
                var link = this.get_l_by_id(links[i]);
                this.update_forwarding_tables(temp_device, link, visited);
            }
        }
    }

    //---- Sub-Routine Functional

    get_l_by_id(id) {
        for (var i in this.links) {
            var temp_link = this.links[i];
            if (temp_link.id == id) {
                return temp_link;
            }
        }
        return null;
    }

    get_s_by_id(id) {
        for (var i in this.subnet_list) {
            var temp_subnet = this.subnet_list[i];
            if (temp_subnet.id == id) {
                return temp_subnet;
            }
        }
        return null;
    }

    get_d_by_id(id) {
        for (var i in this.devices) {
            var temp_device = this.devices[i];
            if (temp_device.id == id) {
                return temp_device;
            }
        }
        return null;
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

    generate_mask_parse(mask) {
        var mask_copy = mask;
        var mask_array = [0, 0, 0, 0];
        var i = 0;
        while (mask_copy > 8) {
            mask_copy -= 8;
            mask_array[i] = parseInt(Number("1".repeat(8)), 2);
            i++;
        }
        mask_array[i] = parseInt(Number(String("1".repeat(mask_copy)) + String("0".repeat(8 - mask_copy))), 2);
        return mask_array;
    }

    generate_random_ip() {
        let ip_address = (Math.floor(Math.random() * 255) + 1) + "." + (Math.floor(Math.random() * 255) + 0) + "." + (Math.floor(Math.random() * 255) + 0) + "." + (Math.floor(Math.random() * 255) + 0);
        while (this.ip_list.indexOf(ip_address) != -1) {
            ip_address = (Math.floor(Math.random() * 255) + 1) + "." + (Math.floor(Math.random() * 255) + 0) + "." + (Math.floor(Math.random() * 255) + 0) + "." + (Math.floor(Math.random() * 255) + 0);
        }
        this.ip_list.push(ip_address);
        return ip_address;
    }

    generate_subnet_ip(subnet) {
        var ip_number;

        for (var i = 0; i < subnet.ip_list.length; i++) {
            if (!subnet.ip_list[i]) {
                ip_number = i + 1;
            }
        }
        if (!ip_number) {
            ip_number = subnet.ip_list.length + 1;
        }

        var max_number = 1020;
        for (var i = 0; i < subnet.mask_array.length; i++) {
            max_number -= subnet.mask_array[i];
        }

        var ip_address = "";
        var ip_array = [];
        if (ip_number <= max_number) {

            while (ip_number > 254) {
                ip_number -= 254;
                ip_array.unshift(254);
            }
            ip_array.unshift(ip_number);

            var subnet_ip_array = subnet.subnet_address.split(".");

            for (var i = 3 - ip_array.length; i >= 0; i--) {
                ip_array.unshift(subnet_ip_array[i]);
            }

            for (var i in ip_array) {
                ip_address += String(ip_array[i]) + ".";
            }

            subnet.ip_list[ip_number - 1] = ip_address.slice(0, -1);
        } else {
            return undefined;
        }
        return ip_address.slice(0, -1);
    }

    generate_subnet(mask, is_private = false) {
        var id;

        for (var i = 0; i < this.subnet_list.length; i++) {
            if (!this.subnet_list[i]) {
                id = i + 1;
            }
        }

        if (!id) {
            id = this.subnet_list.length + 1;
        }

        var subnet_address = "";
        var mask_array = this.generate_mask_parse(mask);

        if (is_private) {
            subnet_address += "10.";
        } else {
            subnet_address += String(id) + ".";
        }

        for (var i in mask_array) {
            if (mask_array[i] == 255) {
                subnet_address += String(id) + ".";
            } else {
                subnet_address += String(0) + ".";
            }
        }

        var subnet = {
            id: id,
            subnet_address: subnet_address.slice(0, -1),
            mask_array: copy_array_1d(mask_array),
            ip_list: []
        }

        this.subnet_list[id - 1] = copy_object(subnet);

        return subnet;
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
        this.forwarding_table = [];
        this.id = id;
        this.id_count = -1;
    }

    get_i_by_id(id) {
        for (var i in this.interfaces) {
            if (this.interfaces[i].id == id) {
                return this.interfaces[i];
            }
        }
        return null;
    }

    get_i_by_ip(ip_address) {
        for (var i in this.interfaces) {
            if (this.interfaces[i].ip_address == ip_address) {
                return this.interfaces[i];
            }
        }
        return null;
    }

    set_ip_address(interface_id, ip_address, subnet_id) {
        for (var i in this.interfaces) {
            if (this.interfaces[i].id == interface_id) {
                this.interfaces[i].ip_address = ip_address;
                this.interfaces[i].subnet_id = subnet_id;
                return ip_address;
            }
        }
    }

    set_coordinates(coordinates) {
        this.coordinates = coordinates;
    }

    add_interface(mac_address, ip_address, side) {
        this.interfaces.push(new Interface(this.generate_id(), mac_address, ip_address, side));
    }

    load_interface(id, mac_address, ip_address, side) {
        this.id_count = (id > this.id_count) ? id : this.id_count;
        this.interfaces.push(new Interface(id, mac_address, ip_address, side));
    }

    generate_id() {
        return ++this.id_count;
    }
}

class Interface {
    constructor(id, mac_address, ip_address, side) {
        this.id = id;
        this.subnet_id = null;
        this.ip_address = (ip_address == null) ? "" : ip_address;
        this.mac_address = mac_address;
        this.side = side;
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
        $canvas.drawLayers();
    }

    render_links() {
        $canvas.removeLayerGroup('links');

        for (var link in this.links) {
            var i1 = $canvas.getLayer('interface_box_' + this.links[link].device_1.dev + '_' + this.links[link].device_1.int);
            var i2 = $canvas.getLayer('interface_box_' + this.links[link].device_2.dev + '_' + this.links[link].device_2.int);
            $canvas.addLayer({
                type: 'line', layer: true,
                name: 'link_' + this.links[link].id, groups: ['common', 'links'], data: { id: this.links[link].id },
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
                this.network.get_d_by_id(data.id).set_coordinates([layer.x, layer.y]);
                this.render_links();
            }.bind(this),

            updateDragX: function (layer, x) {
                return nearest(x);
            },

            updateDragY: function (layer, y) {
                return nearest(y);
            },

            click: function (layer) {
                var side = (layer.x - layer.eventX > 0) ? -1 : 1;

                if (device_remove_status == 0) {
                    remove_device(layer, false);
                }
                if (interface_add_status == 0) {
                    add_interface(layer, side, false);
                }
                if (request_status == 0 || request_status == 1) {
                    send_request(layer, false);
                }
            }.bind(this)
        });

        $canvas.addLayer({
            type: 'text', text: name, layer: true,
            name: 'name_' + id, groups: [id, 'common'], dragGroups: [id],
            x: x, y: y + 73, fromCenter: true, index: 3,
            fillStyle: '#bcc5e4', shadowColor: '#222', shadowBlur: 3, fontSize: font, fontFamily: font_family
        });

        $canvas.addLayer({
            type: 'rectangle', layer: true,
            name: 'box_' + id, groups: [id, 'common'], dragGroups: [id],
            x: x, y: y + 73, width: $canvas.measureText('name_' + id).width * 1.3, height: 22, fromCenter: true, index: 1,
            fillStyle: '#556080', shadowColor: '#222', shadowBlur: 3
        });

        var l_i = 0;
        var r_i = 0;

        var left_length = data.interfaces.filter(function (x) {
            return x.side == -1;
        }).length;

        var right_length = data.interfaces.length - left_length;

        for (var i in data.interfaces) {

            var temp_interface = data.interfaces[i];
            var side = temp_interface.side;
            var n = (side == -1) ? left_length : right_length;
            var index = (side == -1) ? l_i++ : r_i++;

            var y_i = index * 30 - (n / 2 * 30) + 15;
            $canvas.addLayer({
                type: 'rectangle', layer: true,
                name: 'interface_box_' + id + '_' + temp_interface.id, groups: [id, 'common'], dragGroups: [id], data: { device: data, interface_data: temp_interface, interface: temp_interface.id },
                x: x + side * 48, y: y + y_i, width: 20, height: 20, fromCenter: true, index: 6,
                fillStyle: '#556080', shadowColor: '#222', shadowBlur: 3,
                cursors: { mouseover: 'pointer', mousedown: 'pointer', mouseup: 'pointer' },

                mouseover: function (layer) {
                    $canvas.setLayer(layer, {
                        fillStyle: '#bcc5e4'
                    });

                    $canvas.addLayer({
                        type: 'text', text: layer.data.interface_data.mac_address, layer: true,
                        name: 'popup_' + layer.data.interface_data.id, groups: ['common', 'popup'],
                        x: layer.x, y: layer.y - 30, fromCenter: true,
                        fillStyle: '#bcc5e4', shadowColor: '#222', shadowBlur: 3, fontSize: font, fontFamily: font_family
                    });

                    $canvas.addLayer({
                        type: 'rectangle', layer: true,
                        name: 'popup_body_' + layer.data.interface_data.id, groups: ['common', 'popup'],
                        x: layer.x, y: layer.y - 30, width: $canvas.measureText('popup_' + layer.data.interface_data.id).width * 1.3, height: 22, fromCenter: true, index: -1,
                        fillStyle: '#556080', shadowColor: '#222', shadowBlur: 3
                    });

                    $canvas.addLayer({
                        type: 'text', text: layer.data.interface_data.ip_address, layer: true,
                        name: 'popup_1_' + layer.data.interface_data.id, groups: ['popup'],
                        x: layer.x, y: layer.y - 55, fromCenter: true,
                        fillStyle: '#bcc5e4', shadowColor: '#222', shadowBlur: 3, fontSize: font, fontFamily: font_family
                    });

                    $canvas.addLayer({
                        type: 'rectangle', layer: true,
                        name: 'popup_1_body_' + layer.data.interface_data.id, groups: ['common', 'popup'],
                        x: layer.x, y: layer.y - 55, width: $canvas.measureText('popup_1_' + layer.data.interface_data.id).width * 1.3, height: 22, fromCenter: true, index: -1,
                        fillStyle: '#556080', shadowColor: '#222', shadowBlur: 3
                    });

                    $canvas.drawLayers();
                }.bind(this),

                mouseout: function (layer) {
                    $canvas.setLayer(layer, {
                        fillStyle: '#556080'
                    });

                    $canvas.removeLayerGroup('popup');
                    $canvas.drawLayers();
                }.bind(this),

                click: function (layer) {
                    if (connection_add_status == 0 || connection_add_status == 1) {
                        add_connection(layer, false);
                    }
                    if (interface_remove_status == 0) {
                        remove_interface(layer, false);
                    }
                }.bind(this)
            });
        }
    }
}

function nearest(value) {
    return Math.round(value / 20) * 20;
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

start_application(2);
toggle_toolbar(false);