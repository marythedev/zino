// serves as local db for products for now

import React, { createContext, useState } from "react";

// TODO fetch post data from backend
const data = [
    {
        productid: '1',
        title: "Toddler Table",
        price: "80.99",
        priceBefore: "175.99",
        image: "/images/placeholders/table.png",
        category: 'Deals',   // can be multiple categories
        seller: "Shop Center",
        saves: 3000,
        sold: 5000,
        rating: 4.0,
        inStock: 15,
        options: [
            {
                "name": "Color",
                "type": "color",
                "options": [
                    {
                        "name": "Grey",
                        "image": "/images/placeholders/grey-color.png"
                    },
                    {
                        "name": "Space Grey",
                        "image": "/images/placeholders/space-grey-color.png"
                    }
                ]
            }, 
            {
                "name": "Size",
                "type": "chip",
                "options": ["Small", "Medium", "Large"]
            },
            {
                "name": "Type",
                "type": "chip",
                "options": ["Acoustic", "Electric"]
            }
        ],
        specs: [
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Long long Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
        ],
        reviews: [
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            }
        ]
    },
    {
        productid: '2',
        title: "Comb Set",
        price: "5.99",
        priceBefore: "18.99",
        image: "/images/placeholders/comb.png",
        category: 'Deals',
        seller: "Shop Center",
        saves: 3000,
        sold: 5000,
        rating: 4.0,
        inStock: 15,
        options: [
            {
                "name": "Color",
                "type": "color",
                "options": [
                    {
                        "name": "Grey",
                        "image": "/images/placeholders/grey-color.png"
                    },
                    {
                        "name": "Space Grey",
                        "image": "/images/placeholders/space-grey-color.png"
                    }
                ]
            }, 
            {
                "name": "Size",
                "type": "chip",
                "options": ["Small", "Medium", "Large"]
            },
            {
                "name": "Type",
                "type": "chip",
                "options": ["Acoustic", "Electric"]
            }
        ],
        specs: [
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Long long Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
        ],
        reviews: [
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            }
        ]
    },
    {
        productid: '3',
        title: "Sofa",
        price: "399.99",
        priceBefore: "785.99",
        image: "/images/placeholders/sofa.png",
        category: 'Deals',
        seller: "Shop Center",
        saves: 3000,
        sold: 5000,
        rating: 4.0,
        inStock: 15,
        options: [
            {
                "name": "Color",
                "type": "color",
                "options": [
                    {
                        "name": "Grey",
                        "image": "/images/placeholders/grey-color.png"
                    },
                    {
                        "name": "Space Grey",
                        "image": "/images/placeholders/space-grey-color.png"
                    }
                ]
            }, 
            {
                "name": "Size",
                "type": "chip",
                "options": ["Small", "Medium", "Large"]
            },
            {
                "name": "Type",
                "type": "chip",
                "options": ["Acoustic", "Electric"]
            }
        ],
        specs: [
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Long long Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
        ],
        reviews: [
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            }
        ]
    },
    {
        productid: '4',
        title: "Guitar",
        price: "50.99",
        priceBefore: "100.99",
        image: "/images/placeholders/guitar.png",
        category: 'Deals',
        seller: "Shop Center",
        saves: 3000,
        sold: 5000,
        rating: 4.0,
        inStock: 15,
        options: [
            {
                "name": "Color",
                "type": "color",
                "options": [
                    {
                        "name": "Grey",
                        "image": "/images/placeholders/grey-color.png"
                    },
                    {
                        "name": "Space Grey",
                        "image": "/images/placeholders/space-grey-color.png"
                    }
                ]
            }, 
            {
                "name": "Size",
                "type": "chip",
                "options": ["Small", "Medium", "Large"]
            },
            {
                "name": "Type",
                "type": "chip",
                "options": ["Acoustic", "Electric"]
            }
        ],
        specs: [
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
        ],
        reviews: [
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            }
        ]
    },
    {
        productid: '5',
        title: "Macbook",
        price: "1234.99",
        image: "/images/placeholders/macbook.png",
        category: 'Tech',
        seller: "Shop Center",
        saves: 3000,
        sold: 5000,
        rating: 4.0,
        inStock: 15,
        options: [
            {
                "name": "Color",
                "type": "color",
                "options": [
                    {
                        "name": "Grey",
                        "image": "/images/placeholders/grey-color.png"
                    },
                    {
                        "name": "Space Grey",
                        "image": "/images/placeholders/space-grey-color.png"
                    }
                ]
            }, 
            {
                "name": "Size",
                "type": "chip",
                "options": ["Small", "Medium", "Large"]
            },
            {
                "name": "Type",
                "type": "chip",
                "options": ["Acoustic", "Electric"]
            }
        ],
        specs: [
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Long long Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
        ],
        reviews: [
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            }
        ]
    },
    {
        productid: '6',
        title: "Samsung Phone",
        price: "999.99",
        image: "/images/placeholders/samsung-phone.png",
        category: 'Tech',
        seller: "Shop Center",
        saves: 3000,
        sold: 5000,
        rating: 4.0,
        inStock: 15,
        options: [
            {
                "name": "Color",
                "type": "color",
                "options": [
                    {
                        "name": "Grey",
                        "image": "/images/placeholders/grey-color.png"
                    },
                    {
                        "name": "Space Grey",
                        "image": "/images/placeholders/space-grey-color.png"
                    }
                ]
            }, 
            {
                "name": "Size",
                "type": "chip",
                "options": ["Small", "Medium", "Large"]
            },
            {
                "name": "Type",
                "type": "chip",
                "options": ["Acoustic", "Electric"]
            }
        ],
        specs: [
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Long long Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
        ],
        reviews: [
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            }
        ]
    },
    {
        productid: '7',
        title: "Bose Headphones",
        price: "349.99",
        image: "/images/placeholders/bose-headp.png",
        category: 'Tech',
        seller: "Shop Center",
        saves: 3000,
        sold: 5000,
        rating: 4.0,
        inStock: 15,
        options: [
            {
                "name": "Color",
                "type": "color",
                "options": [
                    {
                        "name": "Grey",
                        "image": "/images/placeholders/grey-color.png"
                    },
                    {
                        "name": "Space Grey",
                        "image": "/images/placeholders/space-grey-color.png"
                    }
                ]
            }, 
            {
                "name": "Size",
                "type": "chip",
                "options": ["Small", "Medium", "Large"]
            },
            {
                "name": "Type",
                "type": "chip",
                "options": ["Acoustic", "Electric"]
            }
        ],
        specs: [
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Long long Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
        ],
        reviews: [
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01",
            }
        ]
    },
    {
        productid: '8',
        title: "Logitech Mouse",
        price: "38.99",
        image: "/images/placeholders/logi-mouse.png",
        category: 'Tech',
        seller: "Shop Center",
        saves: 3000,
        sold: 5000,
        rating: 4.0,
        inStock: 15,
        options: [
            {
                "name": "Color",
                "type": "color",
                "options": [
                    {
                        "name": "Grey",
                        "image": "/images/placeholders/grey-color.png"
                    },
                    {
                        "name": "Space Grey",
                        "image": "/images/placeholders/space-grey-color.png"
                    }
                ]
            }, 
            {
                "name": "Size",
                "type": "chip",
                "options": ["Small", "Medium", "Large"]
            },
            {
                "name": "Type",
                "type": "chip",
                "options": ["Acoustic", "Electric"]
            }
        ],
        specs: [
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Long long Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
        ],
        reviews: [
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            }
        ]
    },
    {
        productid: '9',
        title: "Bike",
        price: "345.99",
        image: "/images/placeholders/bike.png",
        category: 'Outdoor Gear',
        seller: "Shop Center",
        saves: 3000,
        sold: 5000,
        rating: 4.0,
        inStock: 15,
        options: [
            {
                "name": "Color",
                "type": "color",
                "options": [
                    {
                        "name": "Grey",
                        "image": "/images/placeholders/grey-color.png"
                    },
                    {
                        "name": "Space Grey",
                        "image": "/images/placeholders/space-grey-color.png"
                    }
                ]
            }, 
            {
                "name": "Size",
                "type": "chip",
                "options": ["Small", "Medium", "Large"]
            },
            {
                "name": "Type",
                "type": "chip",
                "options": ["Acoustic", "Electric"]
            }
        ],
        specs: [
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Long long Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
        ],
        reviews: [
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            }
        ]
    },
    {
        productid: '10',
        title: "Tent",
        price: "278.99",
        image: "/images/placeholders/tent.png",
        category: 'Outdoor Gear',
        seller: "Shop Center",
        saves: 3000,
        sold: 5000,
        rating: 4.0,
        inStock: 15,
        options: [
            {
                "name": "Color",
                "type": "color",
                "options": [
                    {
                        "name": "Grey",
                        "image": "/images/placeholders/grey-color.png"
                    },
                    {
                        "name": "Space Grey",
                        "image": "/images/placeholders/space-grey-color.png"
                    }
                ]
            }, 
            {
                "name": "Size",
                "type": "chip",
                "options": ["Small", "Medium", "Large"]
            },
            {
                "name": "Type",
                "type": "chip",
                "options": ["Acoustic", "Electric"]
            }
        ],
        specs: [
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Long long Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
        ],
        reviews: [
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            }
        ]

    },
    {
        productid: '11',
        title: "Flashlight",
        price: "15.99",
        image: "/images/placeholders/flash.png",
        category: 'Outdoor Gear',
        seller: "Shop Center",
        saves: 3000,
        sold: 5000,
        rating: 4.0,
        inStock: 15,
        options: [
            {
                "name": "Color",
                "type": "color",
                "options": [
                    {
                        "name": "Grey",
                        "image": "/images/placeholders/grey-color.png"
                    },
                    {
                        "name": "Space Grey",
                        "image": "/images/placeholders/space-grey-color.png"
                    }
                ]
            }, 
            {
                "name": "Size",
                "type": "chip",
                "options": ["Small", "Medium", "Large"]
            },
            {
                "name": "Type",
                "type": "chip",
                "options": ["Acoustic", "Electric"]
            }
        ],
        specs: [
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Long long Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
        ],
        reviews: [
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            }
        ]
    },
    {
        productid: '12',
        title: "Tools",
        price: "99.99",
        image: "/images/placeholders/tools.png",
        category: 'Outdoor Gear',
        seller: "Shop Center",
        saves: 3000,
        sold: 5000,
        rating: 4.0,
        inStock: 15,
        options: [
            {
                "name": "Color",
                "type": "color",
                "options": [
                    {
                        "name": "Grey",
                        "image": "/images/placeholders/grey-color.png"
                    },
                    {
                        "name": "Space Grey",
                        "image": "/images/placeholders/space-grey-color.png"
                    }
                ]
            }, 
            {
                "name": "Size",
                "type": "chip",
                "options": ["Small", "Medium", "Large"]
            },
            {
                "name": "Type",
                "type": "chip",
                "options": ["Acoustic", "Electric"]
            }
        ],
        specs: [
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Long long Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
        ],
        reviews: [
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            }
        ]
    },
    {
        productid: '13',
        title: "Casual Shoes",
        price: "123.99",
        image: "/images/placeholders/casual-shoes.png",
        category: 'Shoes',
        seller: "Shop Center",
        saves: 3000,
        sold: 5000,
        rating: 4.0,
        inStock: 15,
        options: [
            {
                "name": "Color",
                "type": "color",
                "options": [
                    {
                        "name": "Grey",
                        "image": "/images/placeholders/grey-color.png"
                    },
                    {
                        "name": "Space Grey",
                        "image": "/images/placeholders/space-grey-color.png"
                    }
                ]
            }, 
            {
                "name": "Size",
                "type": "chip",
                "options": ["Small", "Medium", "Large"]
            },
            {
                "name": "Type",
                "type": "chip",
                "options": ["Acoustic", "Electric"]
            }
        ],
        specs: [
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Long long Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
        ],
        reviews: [
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            }
        ]
    },
    {
        productid: '14',
        title: "Nike Running Shoes Pro",
        price: "254.99",
        image: "/images/placeholders/running-shoes.png",
        category: 'Shoes',
        seller: "Shop Center",
        saves: 3000,
        sold: 5000,
        rating: 4.0,
        inStock: 15,
        options: [
            {
                "name": "Color",
                "type": "color",
                "options": [
                    {
                        "name": "Grey",
                        "image": "/images/placeholders/grey-color.png"
                    },
                    {
                        "name": "Space Grey",
                        "image": "/images/placeholders/space-grey-color.png"
                    }
                ]
            }, 
            {
                "name": "Size",
                "type": "chip",
                "options": ["Small", "Medium", "Large"]
            },
            {
                "name": "Type",
                "type": "chip",
                "options": ["Acoustic", "Electric"]
            }
        ],
        specs: [
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Long long Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
        ],
        reviews: [
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            }
        ]
    },
    {
        productid: '15',
        title: "Casual Luxury Shoes",
        price: "145.99",
        image: "/images/placeholders/luxury-shoes.png",
        category: 'Shoes',
        seller: "Shop Center",
        saves: 3000,
        sold: 5000,
        rating: 4.0,
        inStock: 15,
        options: [
            {
                "name": "Color",
                "type": "color",
                "options": [
                    {
                        "name": "Grey",
                        "image": "/images/placeholders/grey-color.png"
                    },
                    {
                        "name": "Space Grey",
                        "image": "/images/placeholders/space-grey-color.png"
                    }
                ]
            }, 
            {
                "name": "Size",
                "type": "chip",
                "options": ["Small", "Medium", "Large"]
            },
            {
                "name": "Type",
                "type": "chip",
                "options": ["Acoustic", "Electric"]
            }
        ],
        specs: [
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Long long Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
        ],
        reviews: [
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            }
        ]
    },
    {
        productid: '16',
        title: "Casual Sport Shoes",
        price: "58.99",
        image: "/images/placeholders/sport-shoes.png",
        category: 'Shoes',
        seller: "Shop Center",
        saves: 3000,
        sold: 5000,
        rating: 4.0,
        inStock: 15,
        options: [
            {
                "name": "Color",
                "type": "color",
                "options": [
                    {
                        "name": "Grey",
                        "image": "/images/placeholders/grey-color.png"
                    },
                    {
                        "name": "Space Grey",
                        "image": "/images/placeholders/space-grey-color.png"
                    }
                ]
            }, 
            {
                "name": "Size",
                "type": "chip",
                "options": ["Small", "Medium", "Large"]
            },
            {
                "name": "Type",
                "type": "chip",
                "options": ["Acoustic", "Electric"]
            }
        ],
        specs: [
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Long long Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
        ],
        reviews: [
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            }
        ]
    },
    {
        productid: '17',
        title: "Chair",
        price: "88.99",
        image: "/images/placeholders/chair.png",
        category: 'Recommended',
        seller: "Shop Center",
        saves: 3000,
        sold: 5000,
        rating: 4.0,
        inStock: 15,
        options: [
            {
                "name": "Color",
                "type": "color",
                "options": [
                    {
                        "name": "Grey",
                        "image": "/images/placeholders/grey-color.png"
                    },
                    {
                        "name": "Space Grey",
                        "image": "/images/placeholders/space-grey-color.png"
                    }
                ]
            }, 
            {
                "name": "Size",
                "type": "chip",
                "options": ["Small", "Medium", "Large"]
            },
            {
                "name": "Type",
                "type": "chip",
                "options": ["Acoustic", "Electric"]
            }
        ],
        specs: [
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Long long Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
        ],
        reviews: [
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            }
        ]
    },
    {
        productid: '18',
        title: "Mirror",
        price: "137.99",
        image: "/images/placeholders/mirror.png",
        category: 'Recommended',
        seller: "Shop Center",
        saves: 3000,
        sold: 5000,
        rating: 4.0,
        inStock: 15,
        options: [
            {
                "name": "Color",
                "type": "color",
                "options": [
                    {
                        "name": "Grey",
                        "image": "/images/placeholders/grey-color.png"
                    },
                    {
                        "name": "Space Grey",
                        "image": "/images/placeholders/space-grey-color.png"
                    }
                ]
            }, 
            {
                "name": "Size",
                "type": "chip",
                "options": ["Small", "Medium", "Large"]
            },
            {
                "name": "Type",
                "type": "chip",
                "options": ["Acoustic", "Electric"]
            }
        ],
        specs: [
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Long long Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
        ],
        reviews: [
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            }
        ]
    },
    {
        productid: '19',
        title: "Pumpkin Candle",
        price: "9.99",
        image: "/images/placeholders/candle.png",
        category: 'Recommended',
        seller: "Shop Center",
        saves: 3000,
        sold: 5000,
        rating: 4.0,
        inStock: 15,
        options: [
            {
                "name": "Color",
                "type": "color",
                "options": [
                    {
                        "name": "Grey",
                        "image": "/images/placeholders/grey-color.png"
                    },
                    {
                        "name": "Space Grey",
                        "image": "/images/placeholders/space-grey-color.png"
                    }
                ]
            }, 
            {
                "name": "Size",
                "type": "chip",
                "options": ["Small", "Medium", "Large"]
            },
            {
                "name": "Type",
                "type": "chip",
                "options": ["Acoustic", "Electric"]
            }
        ],
        specs: [
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Long long Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
        ],
        reviews: [
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            }
        ]
    },
    {
        productid: '20',
        title: "Small Garden Shovel",
        price: "28.99",
        image: "/images/placeholders/shovel.png",
        category: 'Recommended',
        seller: "Shop Center",
        saves: 3000,
        sold: 5000,
        rating: 4.0,
        inStock: 15,
        options: [
            {
                "name": "Color",
                "type": "color",
                "options": [
                    {
                        "name": "Grey",
                        "image": "/images/placeholders/grey-color.png"
                    },
                    {
                        "name": "Space Grey",
                        "image": "/images/placeholders/space-grey-color.png"
                    }
                ]
            }, 
            {
                "name": "Size",
                "type": "chip",
                "options": ["Small", "Medium", "Large"]
            },
            {
                "name": "Type",
                "type": "chip",
                "options": ["Acoustic", "Electric"]
            }
        ],
        specs: [
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Long long Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Long long Spec Name",
                "value": "Long long Spec Desc  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
            {
                "name": "Spec Name",
                "value": "Spec Description"
            },
        ],
        reviews: [
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            },
            {
                "avatar": "/images/placeholders/reviewUserAvatar.png",
                "author": "Name Lastname",
                "rating": 5,
                "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "date": "2021-09-01"
            }
        ]
    }

];


export const ProductsContext = createContext({
    products: [],
    setProducts: () => { },
    getProductsByCategory: ( category ) => { },
    getProductsById: ( id ) => { },
});

export const ProductsContextProvider = ({
    children,
}) => {
    const [products, setProducts] = useState(data);

    const getProductsByCategory = ( category ) => {
        return products.filter(product => product.category === category);
    }

    const getProductsById = ( id ) => {
        return products.find(product => product.productid === id);
    }

    return (
        <ProductsContext.Provider value={{ products, setProducts, getProductsByCategory, getProductsById }}>
            {children}
        </ProductsContext.Provider>
    );
};