export const mockPost = { 
        "_id": "5b9f4728bc40273febf52706",
        "text": "Tas nisl commlor sit amet, consec!",
        "user": {
            "_id": "5b9eedd621194c102c5280e8",
            "name": "John Doe",
            "avatar": "//www.gravatar.com/avatar/e13743a7f1db7f4246badd6fd6ff54ff?s=200&r=pg&d=mm"
        },
        "likes": [
            {
                "_id": "5ba1dd61809c892f580240ed",
                "user": "5b75f023f1957052e52106f5"
            },
            {
                "_id": "5ba80533058247301e362bf9",
                "user": "5ba1acfc13b542138b29af68"
            },
            {
                "_id": "5ba847153c823e00161763b5",
                "user": "5ba83562ed730446b54def34"
            }
        ],
        "comments": [
            {
                "date": "2018-09-19T05:24:07.399Z",
                "_id": "5ba1dd77809c892f580240ef",
                "text": "Hahahahahahahaaa!",
                "user": {
                    "_id": "5b75f023f1957052e52106f5",
                    "name": "John Grapard",
                    "avatar": "//www.gravatar.com/avatar/254dbff8aa12a023b9f1052ad80b1831?s=200&r=pg&d=mm"
                }
            },
            {
                "date": "2018-09-19T05:26:57.632Z",
                "_id": "5ba1de21f0b9f73054396abf",
                "text": "Nuka proverim esli oshibka ostalas...",
                "user": {
                    "_id": "5b75f023f1957052e52106f5",
                    "name": "John Grapard",
                    "avatar": "//www.gravatar.com/avatar/254dbff8aa12a023b9f1052ad80b1831?s=200&r=pg&d=mm"
                }
            }
        ],
        "date": "2018-09-17T06:18:16.992Z",
        "__v": 0
}

export default new Array(10).fill(mockPost, 0, 10)
