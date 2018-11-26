export const mockPost = {
    "_id": "c717a50ac29bacb2ee",
    "user": {
        "_id": "some_alphanumeric_gibberish",
        "name": "Dwayne Johnson",
        "avatar": ""
    },
    "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "comments": [
        {
            "user": {
                "_id": "some_alphanumeric_gibberish2",
                "name": "Vin Diesel",
                "avatar": ""
            },
            "text": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "date": "1535133201"
        },
        {
            "user": {
                "_id": "some_alphanumeric_gibberish2",
                "name": "Vin Diesel",
                "avatar": ""
            },
            "text": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "date": "1535133201"
        },
        {
            "user": {
                "_id": "some_alphanumeric_gibberish2",
                "name": "Vin Diesel",
                "avatar": ""
            },
            "text": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "date": "1535133201"
        }
    ],
    "likes": [
        {
            "_id": "19825918265102965",
            "user": "aoeu9a8o10s392h0"
        },
        {
            "_id": "19825918265102966",
            "user": "aoeu9a8o10s392hx0"
        },
        {
            "_id": "19825918265102967",
            "user": "aoeu9a8o10s392120"
        }
    ],
    "date": "1535133024"
}

export default new Array(10).fill(mockPost, 0, 10)
