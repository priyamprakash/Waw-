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

// Create the client
function main() {
    const client = new helloProto('localhost:50051', grpc.credentials.createInsecure());
    const name = 'World';
    client.SayHello({ name }, (err, response) => {
        if (err) {
            console.error('Error:', err);
        } else {
            console.log('Response:', response.message);
        }
    });
}

main();
