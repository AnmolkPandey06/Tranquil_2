require("dotenv").config();

const request = require("supertest");
const generateToken = require("../../Middlewares/generateToken");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = require("../../app");
const Product = require("../../Models/products");
const User = require("../../Models/user");

const { ObjectId } = require("mongodb");

beforeAll(async () => {
});

// Clear the test database before each test
beforeEach(async () => {
const testProducts = [
  {
    _id: ObjectId("643aeaad0721bd3e270801c6"),
    Price: 499,
    Name: "Be Calm",
    Company: "",
    author: "Jill P. Weber",
    Type: "Mindfulness Books",
    image: "https://i.imgur.com/tcEYQwm.png",
    __v: 0,
    Stock: 25,
    CutPrice: 449,
  },
  {
    _id: ObjectId("643aeaad0721bd3e270801c8"),
    Price: 299,
    Name: "Happiness Becomes You",
    Company: "",
    author: "Tina Turner",
    Type: "Mindfulness Books",
    image: "https://i.imgur.com/ibXmnNL.png",
    __v: 0,
    Stock: 14,
    CutPrice: 249,
  },
];
await Product.insertMany(testProducts);
}, 50000);

afterEach(async () => {
    await Product.deleteMany();
});

// Disconnect from the test database after all tests
afterAll(async () => {
});


const findUserById = async (userId) => {
  try {
    // Convert the string to ObjectId
    const objectId = new ObjectId(userId);

    const user = await User.findById(objectId);
    if (!user) {
      console.log("User not found");
      return null; // Or handle the case when user is not found
    }
    // console.log("User found:", user);
    return user;
  } catch (error) {
    console.error("Error finding user:", error.message);
    throw error; // Or handle the error appropriately
  }
};

describe("API tests", () => {
  // Test for getAllProducts
  test("GET /products/getproducts", async () => {
    // Generate a mock token
    const user = findUserById("643411d41cf578087f24def5");
    const token=generateToken(user)

    const response = await request(app)
      .get("/products/getproducts")
      .set("Authorization", "Bearer " + token);

    expect(response.status).toBe(200);
    console.log(response.body);
    expect(response.body.products.length).toBe(2); // Check if products are returned
    // Add more assertions based on your API response
  }, 50000);

  // Test for updateUserProfile
  //  test("PUT /api/user/:id", async () => {
  //    const user = await createUser(); // Function to create a user for testing
  //    const update = { name: "New Name" }; // Example update
  //    const response = await request(app)
  //      .put(/api/user/${user._id})
  //      .send({ update });

  //    expect(response.status).toBe(200);
  //    expect(response.body.name).toBe(update.name); // Check if user name is updated
  //  });

  //  // Test for getUserByID
  //  test("GET /api/user", async () => {
  //    const user = await createUser(); // Function to create a user for testing
  //    const response = await request(app).get(/api/user?userId=${user._id});
  //    expect(response.status).toBe(200);
  //    expect(response.body._id).toBe(user._id.toString()); // Check if correct user is returned
  //  });

  //  // Test for updateProduct
  //  test("PUT /api/product/:id", async () => {
  //    const product = await createProduct(); // Function to create a product for testing
  //    const update = { name: "New Product Name" }; // Example update
  //    const response = await request(app)
  //      .put(/api/product/${product._id})
  //      .send({ ...product, ...update });

  //    expect(response.status).toBe(200);
  //    expect(response.body.name).toBe(update.name); // Check if product name is updated
  //  });

  //  // Test for deleteProduct
  //  test("DELETE /api/product/:id", async () => {
  //    const product = await createProduct(); // Function to create a product for testing
  //    const response = await request(app).delete(/api/product/${product._id});
  //    expect(response.status).toBe(200);

  //    // Check if product is deleted
  //    const deletedProduct = await Product.findById(product._id);
  //    expect(deletedProduct).toBeNull();

  //    // Check if product is removed from users' carts
  //    const cartItems = await Cart.find({ "items.product": product._id });
  //    expect(cartItems.length).toBe(0);
  //  });
});