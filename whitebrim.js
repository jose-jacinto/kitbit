import axios from "axios";

var _this = this;

export const getCountryByCode = function getCountryByCode(countryCode, getAll) {
    var resultIn = {
        AD: "Andorra",
        AE: "United Arab Emirates",
        AF: "Afghanistan",
        AG: "Antigua and Barbuda",
        AI: "Anguilla",
        AL: "Albania",
        AM: "Armenia",
        AN: "Netherlands Antilles",
        AO: "Angola",
        AQ: "Antarctica",
        AR: "Argentina",
        AS: "American Samoa",
        AT: "Austria",
        AU: "Australia",
        AW: "Aruba",
        AZ: "Azerbaijan",
        BA: "Bosnia and Herzegovina",
        BB: "Barbados",
        BD: "Bangladesh",
        BE: "Belgium",
        BF: "Burkina Faso",
        BG: "Bulgaria",
        BH: "Bahrain",
        BI: "Burundi",
        BJ: "Benin",
        BM: "Bermuda",
        BN: "Brunei",
        BO: "Bolivia",
        BR: "Brazil",
        BS: "Bahamas",
        BT: "Bhutan",
        BV: "Bouvet Island",
        BW: "Botswana",
        BY: "Belarus",
        BZ: "Belize",
        CA: "Canada",
        CC: "Cocos [Keeling] Islands",
        CD: "Congo [DRC]",
        CF: "Central African Republic",
        CG: "Congo [Republic]",
        CH: "Switzerland",
        CI: "Côte d&apos;Ivoire",
        CK: "Cook Islands",
        CL: "Chile",
        CM: "Cameroon",
        CN: "China",
        CO: "Colombia",
        CR: "Costa Rica",
        CU: "Cuba",
        CV: "Cape Verde",
        CX: "Christmas Island",
        CY: "Cyprus",
        CZ: "Czech Republic",
        DE: "Germany",
        DJ: "Djibouti",
        DK: "Denmark",
        DM: "Dominica",
        DO: "Dominican Republic",
        DZ: "Algeria",
        EC: "Ecuador",
        EE: "Estonia",
        EG: "Egypt",
        EH: "Western Sahara",
        ER: "Eritrea",
        ES: "Spain",
        ET: "Ethiopia",
        FI: "Finland",
        FJ: "Fiji",
        FK: "Falkland Islands [Islas Malvinas]",
        FM: "Micronesia",
        FO: "Faroe Islands",
        FR: "France",
        GA: "Gabon",
        GB: "United Kingdom",
        GD: "Grenada",
        GE: "Georgia",
        GF: "French Guiana",
        GG: "Guernsey",
        GH: "Ghana",
        GI: "Gibraltar",
        GL: "Greenland",
        GM: "Gambia",
        GN: "Guinea",
        GP: "Guadeloupe",
        GQ: "Equatorial Guinea",
        GR: "Greece",
        GS: "South Georgia and the South Sandwich Islands",
        GT: "Guatemala",
        GU: "Guam",
        GW: "Guinea-Bissau",
        GY: "Guyana",
        GZ: "Gaza Strip",
        HK: "Hong Kong",
        HM: "Heard Island and McDonald Islands",
        HN: "Honduras",
        HR: "Croatia",
        HT: "Haiti",
        HU: "Hungary",
        ID: "Indonesia",
        IE: "Ireland",
        IL: "Israel",
        IM: "Isle of Man",
        IN: "India",
        IO: "British Indian Ocean Territory",
        IQ: "Iraq",
        IR: "Iran",
        IS: "Iceland",
        IT: "Italy",
        JE: "Jersey",
        JM: "Jamaica",
        JO: "Jordan",
        JP: "Japan",
        KE: "Kenya",
        KG: "Kyrgyzstan",
        KH: "Cambodia",
        KI: "Kiribati",
        KM: "Comoros",
        KN: "Saint Kitts and Nevis",
        KP: "North Korea",
        KR: "South Korea",
        KW: "Kuwait",
        KY: "Cayman Islands",
        KZ: "Kazakhstan",
        LA: "Laos",
        LB: "Lebanon",
        LC: "Saint Lucia",
        LI: "Lichtenstein",
        LK: "Sri Lanka",
        LR: "Liberia",
        LS: "Lesotho",
        LT: "Lithuania",
        LU: "Luxembourg",
        LV: "Latvia",
        LY: "Libya",
        MA: "Morocco",
        MC: "Monaco",
        MD: "Moldova",
        ME: "Montenegro",
        MG: "Madagascar",
        MH: "Marshall Islands",
        MK: "Macedonia [FYROM]",
        ML: "Mali",
        MM: "Myanmar [Burma]",
        MN: "Mongolia",
        MO: "Macau",
        MP: "Northern Mariana Islands",
        MQ: "Martinique",
        MR: "Mauritania",
        MS: "Montserrat",
        MT: "Malta",
        MU: "Mauritius",
        MV: "Maldives",
        MW: "Malawi",
        MX: "Mexico",
        MY: "Malaysia",
        MZ: "Mozambique",
        NA: "Namibia",
        NC: "New Caledonia",
        NE: "Niger",
        NF: "Norfolk Island",
        NG: "Nigeria",
        NI: "Nicaragua",
        NL: "Netherlands",
        NO: "Norway",
        NP: "Nepal",
        NR: "Nauru",
        NU: "Niue",
        NZ: "New Zealand",
        OM: "Oman",
        PA: "Panama",
        PE: "Peru",
        PF: "French Polynesia",
        PG: "Papua New Guinea",
        PH: "Philippines",
        PK: "Pakistan",
        PL: "Poland",
        PM: "Saint Pierre and Miquelon",
        PN: "Pitcairn Islands",
        PR: "Puerto Rico",
        PS: "Palestinian Territories",
        PT: "Portugal",
        PW: "Palau",
        PY: "Paraguay",
        QA: "Qatar",
        RE: "Réunion",
        RO: "Romania",
        RS: "Serbia",
        RU: "Russia",
        RW: "Rwanda",
        SA: "Saudi Arabia",
        SB: "Solomon Islands",
        SC: "Seychelles",
        SD: "Sudan",
        SE: "Sweden",
        SG: "Singapore",
        SH: "Saint Helena",
        SI: "Slovenia",
        SJ: "Svalbard and Jan Mayen",
        SK: "Slovakia",
        SL: "Sierra Leone",
        SM: "San Marino",
        SN: "Senegal",
        SO: "Somalia",
        SR: "Suriname",
        ST: "São Tomé and Príncipe",
        SV: "El Salvador",
        SY: "Syria",
        SZ: "Swaziland",
        TC: "Turks and Caicos Islands",
        TD: "Chad",
        TF: "French Southern Territories",
        TG: "Togo",
        TH: "Thailand",
        TJ: "Tajikistan",
        TK: "Tokelau",
        TL: "Timor-Leste",
        TM: "Turkmenistan",
        TN: "Tunisia",
        TO: "Tonga",
        TR: "Turkey",
        TT: "Trinidad and Tobago",
        TV: "Tuvalu",
        TW: "Taiwan",
        TZ: "Tanzania",
        UA: "Ukraine",
        UG: "Uganda",
        US: "United States",
        UY: "Uruguay",
        UZ: "Uzbekistan",
        VA: "Vatican City",
        VC: "Saint Vincent and the Grenadines",
        VE: "Venezuela",
        VG: "British Virgin Islands",
        VI: "U.S. Virgin Islands",
        VN: "Vietnam",
        VU: "Vanuatu",
        WF: "Wallis and Futuna",
        WS: "Samoa",
        XK: "Kosovo",
        YE: "Yemen",
        YT: "Mayotte",
        ZA: "South Africa",
        ZM: "Zambia",
        ZW: "Zimbabwe",
    };

    if (getAll) {
        return resultIn;
    }

    return resultIn[countryCode];
};

let _countryList = {
    getCountryByCode: getCountryByCode,
};

export const registerUser = (options) =>
    new Promise((resolve, reject) => {
        const processRequest = {
            name: options.name,
            email: options.email,
            password: options.password,
            shipping_address: {
                name: options.shipping_address.name,
                street1: options.shipping_address.street1,
                street2: options.shipping_address.street2,
                code: options.shipping_address.code,
                city: options.shipping_address.city,
                country: options.shipping_address.country,
            },
            billing_address: {
                name: options.shipping_address.name,
                street1: options.shipping_address.street1,
                street2: options.shipping_address.street2,
                code: options.shipping_address.code,
                city: options.shipping_address.city,
                country: options.shipping_address.country,
            },
            custom: options.custom,
            cart_items: options.cart_items ? options.cart_items : [],
        };
        axios
            .post(`${process.env.NEXT_PUBLIC_WB_DOMAIN}/api/project/${process.env.NEXT_PUBLIC_WB_PROJECT_ID}/account`, processRequest, {})
            .then((response) => {
                localStorage.setItem("wb_token", response.headers.authorization);
                localStorage.setItem("wb_token_expiration", response.data.valid_until);

                resolve(response, response.headers.authorization);
            })
            .catch((err) => {
                reject(err);
            });
    });

export const loginUser = (options) =>
    new Promise((resolve, reject) => {
        const processRequest = {
            email: options.email,
            password: options.password,
        };
        axios
            .post(`${process.env.NEXT_PUBLIC_WB_DOMAIN}/api/project/${process.env.NEXT_PUBLIC_WB_PROJECT_ID}/account/login`, processRequest, {})
            .then((response) => {
                localStorage.setItem("wb_token", response.headers.authorization);
                localStorage.setItem("wb_token_expiration", response.data.valid_until);

                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
    });

export const getUser = (options) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${process.env.NEXT_PUBLIC_WB_DOMAIN}/api/project/${process.env.NEXT_PUBLIC_WB_PROJECT_ID}/account/me`, {
                headers: {
                    Authorization: localStorage.getItem("wb_token"),
                },
            })
            .then((response) => {
                localStorage.setItem("wb_userId", response.data._id);
                response.data.token = localStorage.getItem("wb_token");
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
    });

export const setUser = (options) => {
    _this.user.shipping_address = options.shipping_address;
    _this.user_id = options._id;
    _this.cart.items = options.cart;
};

export const submitResetPassword = (options) =>
    new Promise((resolve, reject) => {
        const processRequest = {
            password: options.password,
            email: options.email,
            user_ref: options.user_ref,
            query_ref: options.query_ref,
        };
        return axios
            .post(`${process.env.NEXT_PUBLIC_WB_DOMAIN}/api/project/${process.env.NEXT_PUBLIC_WB_PROJECT_ID}/account/me/complete_password_change`, processRequest, {})
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
    });

export const submitRecoverPassword = (options) =>
    new Promise((resolve, reject) => {
        const processRequest = {
            email: options.email,
        };
        return axios
            .post(`${process.env.NEXT_PUBLIC_WB_DOMAIN}/api/project/${process.env.NEXT_PUBLIC_WB_PROJECT_ID}/account/me/request_password_change`, processRequest, {})
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
    });

export const editUser = (options) =>
    new Promise((resolve, reject) => {
        const processRequest = {
            name: options.name,
            email: options.email,
            shipping_address: {
                name: options.shipping_address.name,
                street1: options.shipping_address.street1,
                street2: options.shipping_address.street2,
                code: options.shipping_address.code,
                city: options.shipping_address.city,
                country: "PT",
            },
            billing_address: {
                name: options.billing_address.name,
                street1: options.billing_address.street1,
                street2: options.billing_address.street2,
                code: options.billing_address.code,
                city: options.billing_address.city,
                country: "PT",
            },
        };

        if (options.custom) {
            processRequest.custom = options.custom;
        }
        axios
            .put(`${process.env.NEXT_PUBLIC_WB_DOMAIN}/api/project/${process.env.NEXT_PUBLIC_WB_PROJECT_ID}/account/me`, processRequest, {
                headers: {
                    Authorization: localStorage.getItem("wb_token"),
                },
            })
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
    });

export const changePassword = (options) =>
    new Promise((resolve, reject) => {
        const processRequest = {
            email: options.email,
            password: options.password,
            new_password: options.new_password,
        };

        axios
            .post(`${process.env.NEXT_PUBLIC_WB_DOMAIN}/api/project/${process.env.NEXT_PUBLIC_WB_PROJECT_ID}/account/me/change_password`, processRequest, {
                headers: {
                    Authorization: localStorage.getItem("wb_token"),
                },
            })
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
    });

export const getCart = (callback) => {
    return callback(null, _this.cart);
};

export const getStoreSettings = (options) =>
    new Promise((resolve, reject) => {
        let that = _this;

        axios
            .get(`${process.env.NEXT_PUBLIC_WB_DOMAIN}/api/store/${process.env.NEXT_PUBLIC_WB_STORE_ID}/frontstore`, {})
            .then((response) => {
                let parsedResponse = response.data;
                response.data.shipping_rates = parsedResponse.shipping_rates;
                response.data.shipping_rules = parsedResponse.shipping_rules;
                response.data.vat = parsedResponse.VAT;

                if (response.data.shipping_rules.rotw) {
                    let myFullCountries = (0, _countryList.getCountryByCode)(null, true);
                    let i = 0;

                    for (let key in myFullCountries) {
                        parsedResponse.shipping_rules.allow_list[i] = {
                            name: myFullCountries[key],
                            code: key,
                        };
                        i++;
                    }
                } else {
                    for (let _i = 0; _i < parsedResponse.shipping_rules.allow_list.length; _i++) {
                        parsedResponse.shipping_rules.allow_list[_i] = {
                            name: (0, _countryList.getCountryByCode)(parsedResponse.shipping_rules.allow_list[_i]),
                            code: parsedResponse.shipping_rules.allow_list[_i],
                        };
                    }
                }
                resolve(parsedResponse);
            })
            .catch((err) => {
                reject(err);
            });
    });

export const getShippingFee = (options, cart, shipping) => {
    var returnObj = [];

    for (var i = 0; i < shipping.shipping_rates.flat.length; i++) {
        for (var j = 0; j < shipping.shipping_rates.flat[i].country_code.length; j++) {
            // matching the country code with available country rules
            if (shipping.shipping_rates.flat[i].country_code[j] === options.country_code) {
                // calculate the total amounts
                var myTotalItems = 0;
                var myTotalAmount = 0;

                for (var z = 0; z < cart.cartItems.length; z++) {
                    myTotalItems += cart.cartItems[z].quantity;
                    myTotalAmount += cart.cartItems[z].quantity * cart.cartItems[z].price;
                }

                if (shipping.shipping_rates.flat[i].free.enabled && shipping.shipping_rates.flat[i].free.minimum <= myTotalAmount) {
                    shipping.shipping_ref = shipping.shipping_rates.flat[i].id;
                    return {
                        totalFee: 0,
                    }; // eslint-disable-next-line no-else-return
                } else {
                    returnObj.push({
                        id: shipping.shipping_rates.flat[i]._id,
                        name: shipping.shipping_rates.flat[i].name,
                        totalFee: myTotalItems * shipping.shipping_rates.flat[i].per_item + shipping.shipping_rates.flat[i].per_order,
                    });
                }
            }
        }

        if (returnObj.length === 0 && shipping.shipping_rules.rotw) {
            var isSomeROTW = shipping.shipping_rates.flat[i].country_code.some(function (item) {
                return item === "ROTW";
            });

            if (isSomeROTW) {
                // eslint-disable-next-line no-redeclare
                for (var z = 0; z < cart.cartItems.length; z++) {
                    myTotalItems += cart.cartItems[z].quantity;
                    myTotalAmount += cart.cartItems[z].quantity * cart.cartItems[z].price;
                }

                if (shipping.shipping_rates.flat[i].free.enabled && shipping.shipping_rates.flat[i].free.minimum <= myTotalAmount) {
                    shipping.shipping_ref = shipping.shipping_rates.flat[i]._id;
                    return {
                        totalFee: 0,
                    }; // eslint-disable-next-line no-else-return
                } else {
                    returnObj.push({
                        id: shipping.shipping_rates.flat[i]._id,
                        name: shipping.shipping_rates.flat[i].name,
                        totalFee: myTotalItems * shipping.shipping_rates.flat[i].per_item + shipping.shipping_rates.flat[i].per_order,
                    });
                }
            }
        }
    }

    if (shipping.shipping_rates.store_pickup.enabled) {
        returnObj.push({
            id: "store_pickup",
            name: shipping.shipping_rates.store_pickup.name,
            totalFee: myTotalItems * shipping.shipping_rates.store_pickup.per_item + shipping.shipping_rates.store_pickup.per_order,
        });
    }

    return returnObj;
};

export const getItems = (options) =>
    new Promise((resolve, reject) => {
        let filterString = "?";

        if (options.filters) {
            let i = 0;
            for (let k in options.filters) {
                if (typeof options.filters[k] !== 'undefined' && options.filters[k] !== null) filterString += "".concat(k, "=").concat(options.filters[k], "&");
                i++;
            }
        }
        
        if (options.pagination) filterString += "limit=".concat(options.pagination.limit, "&page=").concat(options.pagination.page, "");
        if (options.q) filterString += `&q=${options.q}`

        axios
            .get(`${process.env.NEXT_PUBLIC_WB_DOMAIN}/api/model/${process.env.NEXT_PUBLIC_WB_PROJECT_ID}/${options.modelName}${filterString}`, {})
            .then((response) => {                
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
    });

export const getItemByUri = (options) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${process.env.NEXT_PUBLIC_WB_DOMAIN}/api/model/${process.env.NEXT_PUBLIC_WB_PROJECT_ID}/${options.modelName}/${options.uri}`, {})
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
    });

export const addToCart = (options) =>
    new Promise((resolve, reject) => {
        let processRequest;

        if (typeof options.variant !== "undefined" && options.variant !== null && options.variant !== "") {
            processRequest = {
                cart_item: {
                    addons: options.addons,
                    customizations: options.customizations,
                    model_id: options.model_id,
                    model_name: options.model_name,
                    quantity: options.quantity,
                    variant: options.variant,
                },
            };
        } else {
            processRequest = {
                cart_item: {
                    addons: options.addons,
                    customizations: options.customizations,
                    model_id: options.model_id,
                    model_name: options.model_name,
                    quantity: options.quantity,
                },
            };
        }

        axios
            .post(`${process.env.NEXT_PUBLIC_WB_DOMAIN}/api/project/${process.env.NEXT_PUBLIC_WB_PROJECT_ID}/account/${options.userId}/add_to_cart`, processRequest, {
                headers: {
                    Authorization: localStorage.getItem("wb_token"),
                },
            })
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
    });

export const removeFromCart = (options) =>
    new Promise((resolve, reject) => {
        let processRequest;

        if (typeof options.variant !== "undefined" && options.variant !== null && options.variant !== "") {
            processRequest = {
                cart_item: {
                    addons: options.addons,
                    customizations: options.customizations,
                    model_id: options.model_id,
                    model_name: options.model_name,
                    quantity: options.quantity,
                    variant: options.variant,
                },
            };
        } else {
            processRequest = {
                cart_item: {
                    addons: options.addons,
                    customizations: options.customizations,
                    model_id: options.model_id,
                    model_name: options.model_name,
                    quantity: options.quantity,
                    variant: null,
                },
            };
        }

        // ?item_id=${options.item_id}

        axios
            .post(`${process.env.NEXT_PUBLIC_WB_DOMAIN}/api/project/${process.env.NEXT_PUBLIC_WB_PROJECT_ID}/account/${options.userId}/add_to_cart?item_id=${options.item_id}`, processRequest, {
                headers: {
                    Authorization: localStorage.getItem("wb_token"),
                },
            })
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
    });

export const createPaymentIntent = (options) =>
    new Promise((resolve, reject) => {
        let processRequest = {
            platform: "stripe",
            shippingRef: options.id,
        };
        axios
            .post(`${process.env.NEXT_PUBLIC_WB_DOMAIN}/api/project/${process.env.NEXT_PUBLIC_WB_PROJECT_ID}/account/payment_intent`, processRequest, {
                headers: {
                    Authorization: localStorage.getItem("wb_token"),
                },
            })
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
    });

export const updatePaymentIntent = (options) =>
    new Promise((resolve, reject) => {
        let processRequest = {
            platform: "stripe",
            shippingRef: options.shippingRef.id,
            clientSecret: options.clientSecret,
        };
        axios
            .put(`${process.env.NEXT_PUBLIC_WB_DOMAIN}/api/project/${process.env.NEXT_PUBLIC_WB_PROJECT_ID}/account/payment_intent`, processRequest, {
                headers: {
                    Authorization: localStorage.getItem("wb_token"),
                },
            })
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
    });

export const submitOrder = (options) =>
    new Promise((resolve, reject) => {
        var myTokenizer = {};

        if (options.payment_method === "stripe") {
            myTokenizer["stripe_data"] = {
                type: "sale:cc",
                intent: options.intent,
            };
        } else if (options.payment_method === "paypal") {
            myTokenizer["paypal_data"] = {
                token: options.token,
                type: "sale",
            };
        } else if (options.payment_method === "offline") {
            myTokenizer["offline_data"] = {
                token: null,
            };
            myTokenizer["shipping_ref"] = options.shipping_ref;
        } else if (options.payment_method === "multibanco") {
            myTokenizer["stripe_data"] = {
                type: "sale:mb",
                return_url: options.return_url,
            };
            myTokenizer["shipping_ref"] = options.shipping_ref;
        } else if (options.payment_method === "crowdfund") {
            myTokenizer["crowdfund_data"] = {
                intent: options.intent,
            };
        } else {
            return;
        }

        axios
            .post(`${process.env.NEXT_PUBLIC_WB_DOMAIN}/api/project/${process.env.NEXT_PUBLIC_WB_PROJECT_ID}/account/place_order`, myTokenizer, {
                headers: {
                    Authorization: localStorage.getItem("wb_token"),
                },
            })
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
    });

export const getCheckoutTotals = (options) =>
    new Promise((resolve, reject) => {
        let postValues = {
            shippingRef: options.shippingRef,
        };
        axios
            .post(`${process.env.NEXT_PUBLIC_WB_DOMAIN}/api/project/${process.env.NEXT_PUBLIC_WB_PROJECT_ID}/${options.userId}/account/checkout`, postValues, {
                headers: {
                    Authorization: localStorage.getItem("wb_token"),
                },
            })
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
    });

export const goToCheckoutPage = (options) =>
    new Promise((resolve, reject) => {
        axios
            .post(`${process.env.NEXT_PUBLIC_WB_DOMAIN}/api/project/${process.env.NEXT_PUBLIC_WB_PROJECT_ID}/account/checkout_session`, { deploymentId: process.env.NEXT_PUBLIC_WB_DEPLOYMENT_ID }, {})
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
    });
