export const plans_body = {
    "filter":[
        {
            "field":"product_category_id",
            "value":1
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