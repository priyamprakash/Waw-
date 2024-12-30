const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Load the protobuf
const PROTO_PATH = path.join(__dirname, 'hello.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const helloProto = grpc.loadPackageDefinition(packageDefinition).HelloService;

// Implement the SayHello RPC
function sayHello(call, callback) {
    const name = call.request.name;
    callback(null, { message: `Hello, ${name}!` });
}

// Start the gRPC server
function main() {
    const server = new grpc.Server();
    server.addService(helloProto.service, { SayHello: sayHello });
    const PORT = '0.0.0.0:50051';
    server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), () => {
        console.log(`Server is running at ${PORT}`);
        server;
    });
}

main();
