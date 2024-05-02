require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
const feed = require('../../Models/feed');;
const Comment = require('../../Models/comments');
const User = require("../../Models/user");

const { ObjectId } = require("mongodb");

beforeAll(async () => {
});

// Clear the test database before each test
beforeEach(async () => {
    const testFeeds = [
        {
            likes: 7,
            reallikes: ['65d60441e33384d11e039934', '65d60441e33384d11e039934'],
            uploaddate: new Date("2022-03-27T00:00:00.000Z"),
            reportarr: ['643411d41cf578087f24def5'],
            comments: [
                "64391c7f7c027232041abb2b",
                "64398275f7409fd9bbede8cb",
                "643adfaae188928ca085d663",
                "64483f145f338a52e4ba1b7b",
                "6469d783467151f16cb14172",
                "65e6db613789ec36110a19dd",
                "65e6eee71dd2327682014ee3",
                "65e6ef729e264f8220f09f3b",
                "65e83ed41ed0b06b6bf6f963",
                "65e83ed81ed0b06b6bf6f96b",
                "65e85011289d9617105d7dbd",
                "65e851d9289d9617105d7dd3",
                "6632b901bf0ac2001e9a23d3"
            ],
            checked: true,
            _id: "643419c8f060c9b58d12e2fb",
            title: 'Trust',
            topic: 'Discussion',
            image: 'https://source.unsplash.com/random/?Trust',
            caption: 'Everything depends on Trust ',
            descriptions: 'What should I do when I feel there is no one whom I can trust',
            author: {
                Signupdate: new Date("2023-04-10T13:39:47.286Z"),
                SmileCount: 0,
                commentlike: 0,
                cart: [],
                _id: "6434123d1cf578087f24df27",
                email: 'divyanshu@gmail.com',
                pfp: 'https://i.imgur.com/nfXx1EM.jpg',
                username: 'Divyanshu',
                salt: 'f1c97e76dc8451ad63d2b96f9d3e98dbad2ab7f068b58cb658b53688b55bd0df',
                hash: '549c24e2b8dab1c3f4805e77a78d6309d43fbf4d34651c7254f083f96457601769bc9412c0f515fedc641efd0d6683cd5b4247bdf8df7a20e48ad4b6dcb54c487241ad4222eaa5920dc9d55d89d51feb63c8af11445a982a0edecabbbf9fa6ae589b8568902b77010df0c126498f2ec04b1626bbe2676b4c47146a9dd400db4029fdd982eae1cbc5d787b5c37f575b7e9879d00b55c7de3c5e1ae75e3a3d7c1caae782a84b96b41d62767b2ab294aea976bf78154aaaabd742d2f26c222b9ea44cab11bd3fda991b6214d40ff9c9891e96ccc8bbf85975781c08aaa764e69c25298c1925bd11c0ee70e86259dc774f105521e5c0292ca6b96ed52fb4f7cec939369561170296f4def18cca143e21acc4761c83b11da3025943abcd0bfe99a6bf61aca275f9b85b12c4e4a1a08b9e1e55b1fd0df92c3ea5212edffb413258984094b283ff76796f64360f9395feb5e97c2761811ba55f0890d4738fab5dcc5d054c391a7da8e70412f4b95104851d91db05a23ba03e6fc25cabd5a05bfc290394abe3ee2f143562cda8793bc46aae83477f37d08d5b893ed0d0b80a48aa3b10fe751c0acbc93c16b65da1ce0ff969364a62b9ce671c51a4a5bef2699cc82c9e167821b48fd8b0ec31ef4eaca14d59884971935d76f8bf0f0584774bb03544c9e8d267271ef492952d51d3fab5502307de689325a65b5224af119094947f150c60',
                __v: 0
            },
            __v: 22
        },
        {
            likes: 4,
            reallikes: [],
            uploaddate: new Date("2022-03-27T00:00:00.000Z"),
            reportarr: ['643411d41cf578087f24def5', '65d60441e33384d11e039934'],
            comments: [
                "65e6efaf9e264f8220f09f4c",
                "65e6effc168a43903c944fea",
                "662e317df3cd0f291805b973"
            ],
            checked: true,
            _id: "643419c8f060c9b58d12e2fd",
            title: 'Regret',
            topic: 'Discussion',
            image: 'https://source.unsplash.com/random/?Regret',
            caption: 'Move On yaar....The life is too big',
            descriptions: 'Regret is not a proactive feeling. It is situated in disappointment, sorrow, even remorse. It merely wishes things were different without an act to cause a difference. However, repentance is different. Repentance is an admission of',
            author: {
            Signupdate: new Date("2023-04-10T13:39:47.286Z"),
            SmileCount: 0,
            commentlike: 0,
            cart: [],
            _id: "643411d41cf578087f24def5",
            email: 'divyanshu@gmail.com',
            pfp: 'https://i.imgur.com/nfXx1EM.jpg',
            username: 'Divyanshu',
            salt: 'f1c97e76dc8451ad63d2b96f9d3e98dbad2ab7f068b58cb658b53688b55bd0df',
            hash: '549c24e2b8dab1c3f4805e77a78d6309d43fbf4d34651c7254f083f96457601769bc9412c0f515fedc641efd0d6683cd5b4247bdf8df7a20e48ad4b6dcb54c487241ad4222eaa5920dc9d55d89d51feb63c8af11445a982a0edecabbbf9fa6ae589b8568902b77010df0c126498f2ec04b1626bbe2676b4c47146a9dd400db4029fdd982eae1cbc5d787b5c37f575b7e9879d00b55c7de3c5e1ae75e3a3d7c1caae782a84b96b41d62767b2ab294aea976bf78154aaaabd742d2f26c222b9ea44cab11bd3fda991b6214d40ff9c9891e96ccc8bbf85975781c08aaa764e69c25298c1925bd11c0ee70e86259dc774f105521e5c0292ca6b96ed52fb4f7cec939369561170296f4def18cca143e21acc4761c83b11da3025943abcd0bfe99a6bf61aca275f9b85b12c4e4a1a08b9e1e55b1fd0df92c3ea5212edffb413258984094b283ff76796f64360f9395feb5e97c2761811ba55f0890d4738fab5dcc5d054c391a7da8e70412f4b95104851d91db05a23ba03e6fc25cabd5a05bfc290394abe3ee2f143562cda8793bc46aae83477f37d08d5b893ed0d0b80a48aa3b10fe751c0acbc93c16b65da1ce0ff969364a62b9ce671c51a4a5bef2699cc82c9e167821b48fd8b0ec31ef4eaca14d59884971935d76f8bf0f0584774bb03544c9e8d267271ef492952d51d3fab5502307de689325a65b5224af119094947f150c60',
            __v: 0
        },
        __v: 22
        }
    ];
await feed.insertMany(testFeeds);
}, 50000);

afterEach(async () => {
    await feed.deleteMany();
});

// Disconnect from the test database after all tests
afterAll(async () => {
});

describe("API tests", () => {
    // Test for getAllFeed
    test("GET /feed", async () => {
        const response = await request(app)
            .get("/feed")

        expect(response.status).toBe(200);
        // console.log(response.body);
        expect(response.body.length).toBe(2); // Check if products are returned
        // Add more assertions based on your API response
    }, 50000);

});