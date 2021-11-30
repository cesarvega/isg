export const plans_body = {
    "filter":[
        {
            "field":"product_category_id",
            "value":1
        },"AND",
        {
            "field": "slug",
            "value": "%@@l",
            "operator": "LIKE"
        }
    ]
}

export const byod_body = {
    "filter": [
        {
            "field": "name",
            "value": "BYOD"
        }, "OR",
        {
            "field": "name",
            "value": "RWPD"
        }
        ]
    }

export const get_customer = {
    "filter": [
        {
            "field": "phone_number",
            "value": "@@"
        }
    ]
}

export const rep_wireless = {
        "firstName" : "@firstName",
        "lastName" : "@lastName",
        "address" : {
            "lineOne": "@lineOne",
            "lineTwo": "@lineTwo",
            "city": "@city",
            "state": "@state",
            "zip": "@zip"
        },
        "emailAddress" : "@emailAddress",
        "phone" : "@phone",
        "accountId" : null
}