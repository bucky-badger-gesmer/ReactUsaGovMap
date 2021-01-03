const apiKey = 'jGxfPjMYvOkeKZX2YlPvaK4FctW2Vzj1Makj66vR';
const currentCongress = 116;

export const states = {
    AL: 'Alabama',
    AK: 'Alaska',
    AZ: 'Arizona',
    AR: 'Arkansas',
    CA: 'California',
    CO: 'Colorado',
    CT: 'Connecticut',
    DE: 'Delaware',
    DC: 'District of Columbia',
    FL: 'Florida',
    GA: 'Georgia',
    HI: 'Hawaii',
    ID: 'Idaho',
    IL: 'Illinois',
    IN: 'Indiana',
    IA: 'Iowa',
    KS: 'Kansas',
    KY: 'Kentucky',
    LA: 'Louisiana',
    ME: 'Maine',
    MD: 'Maryland',
    MA: 'Massachusetts',
    MI: 'Michigan',
    MN: 'Minnesota',
    MS: 'Mississippi',
    MO: 'Missouri',
    MT: 'Montana',
    NE: 'Nebraska',
    NV: 'Nevada',
    NH: 'New Hampshire',
    NJ: 'New Jersey',
    NM: 'New Mexico',
    NY: 'New York',
    NC: 'North Carolina',
    ND: 'North Dakota',
    OH: 'Ohio',
    OK: 'Oklahoma',
    OR: 'Oregon',
    PA: 'Pennsylvania',
    RI: 'Rhode Island',
    SC: 'South Carolina',
    SD: 'South Dakota',
    TN: 'Tennessee',
    TX: 'Texas',
    UT: 'Utah',
    VT: 'Vermont',
    VA: 'Virginia',
    WA: 'Washington',
    WV: 'West Virginia',
    WI: 'Wisconsin',
    WY: 'Wyoming',
    // Delegates:
    AS: 'American Samoa',
    GU: 'Guam',
    MP: 'Northern Mariana Islands',
    PR: 'Puerto Rico',
    VI: 'Virgin Islands'
};

export const districtGenerator = (districtNumber) => {
    if (districtNumber == 'At-Large') {
        return districtNumber;
    }

    let j = districtNumber % 10,
    k = districtNumber % 100;
    if (j == 1 && k != 11) {
        return districtNumber + "st";
    }
    if (j == 2 && k != 12) {
        return districtNumber + "nd";
    }
    if (j == 3 && k != 13) {
        return districtNumber + "rd";
    }
    return districtNumber + "th";
};

export const getSenators = () => {
    return fetch(`https://api.propublica.org/congress/v1/${currentCongress}/Senate/members.json`, {
        headers: {
            'x-api-key': apiKey
        }
    }).then(resp => resp.json());
};

export const getRepresentatives = () => {
    return fetch(`https://api.propublica.org/congress/v1/${currentCongress}/House/members.json`, {
        headers: {
            'x-api-key': apiKey
        }
    }).then(resp => resp.json());
};

export const getMemberAge = (dateOfBirth) => {
    let today = new Date();
    let birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age --;
    }

    return age;
};

export const getMemberParty = (party) => {
    switch (party) {
        case 'R':
            return 'Republican';
        case 'D':
            return 'Democrat';
        case 'I':
            return 'Independent'
        default:
            return party;
    }
};
