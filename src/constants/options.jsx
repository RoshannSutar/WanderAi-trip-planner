export const SelectTravelsList=[
    {
        id:1,
        title:'Just Me',
        desc:'A solo travels in exploration',
        icon:'🚶‍♂️',
        people:'1 person'
    },
    {
        id:2,
        title:'A Couple',
        desc:'Two Travels in tandem',
        icon:'🥂',
        people:'2 people'
    },
    {
        id:3,
        title:'Family',
        desc:'A group of fun loving adv',
        icon:'👨‍👩‍👧‍👦',
        people:'3 to 5 People'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seeks',
        icon:'⛺',
        people:'5 to 10 people'
    },
    
]

export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Stay Cost Concious',
        icon:'🪙',
    },
    {
        id:2,
        title:'Moderate',
        desc:'Average Side Cost',
        icon:'💵',
    },
    {
        id:3,
        title:'Expensive',
        desc:'Dont Worry About Cost',
        icon:'💰',
    },
]
export const AI_PROMPT = 'Generate travel plan for location: {Location} for {totalDays} Days for {traveler} with a {budget} budget. Give me a hotel options list with hotel name, hotel address, price, hotel image, url, geo coordinates, ratings, description, and suggest itinerary with place name, place details, place url, geo coordinates, ticket, pricing, ratings, time travel, each of the location for {totalDays} days with each travel plan with best time to visit in JSON Format.'