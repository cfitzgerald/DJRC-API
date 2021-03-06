const db = require('./models/db');
const { Genre, Promo, User, Venue } = require('./models/index').models;
const bcrypt = require('bcrypt');

const shuffle = (array) => {
    let currentIndex = array.length,
        tempVal, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        tempVal = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = tempVal;
    }
    return array;
};

const createPassword = (password) => {
    return bcrypt.genSalt(10)
        .then(salt => {
            return bcrypt.hash(password, salt);
        })
        .then(hash => {
            return hash;
        })
        .catch(err => console.log(err));
};

const seed = () => {
    return db.sync({
            force: true
        })
        .then(() => {
            // let jazz, pop, rap, electronics, country, heavyMetal, classicRock, seventies, eighties, nineties, chill;
            let genres;
            return Promise.all([
                    //Genre Creation
                    Genre.create({
                        name: 'Jazz'
                    }),
                    Genre.create({
                        name: 'Pop'
                    }),
                    Genre.create({
                        name: 'Rap'
                    }),
                    Genre.create({
                        name: 'Electronic'
                    }),
                    Genre.create({
                        name: 'Country'
                    }),
                    Genre.create({
                        name: 'Heavy Metal'
                    }),
                    Genre.create({
                        name: 'Classic Rock'
                    }),
                    Genre.create({
                        name: '70\'s'
                    }),
                    Genre.create({
                        name: '80\'s'
                    }),
                    Genre.create({
                        name: '90\'s'
                    })
                ])
                .then((_genres) => {
                    genres = _genres;
                })
                .then(() => {
                    //Password Creation for Userrs
                    return Promise.all([
                        createPassword('Dan'),
                        createPassword('Jon'),
                        createPassword('Colin'),
                        createPassword('Rav'),
                        createPassword('djrc-api')
                    ]);
                })
                .then(([passD, passJ, passC, passR, passAdmin]) => {
                    //User Creation
                    return Promise.all([
                        User.create({
                            firstName: 'Dan',
                            lastName: 'Weissbard',
                            email: 'Dan@dan.com',
                            password: passD,
                            isBusiness: false,
                            gender: 'male'
                        }),
                        User.create({
                            firstName: 'Jon',
                            lastName: 'Brandwein',
                            email: 'Jon@jon.com',
                            password: passJ,
                            isBusiness: false,
                            gender: 'male'
                        }),
                        User.create({
                            firstName: 'Colin',
                            lastName: 'FitzGerald',
                            email: 'Colin@colin.com',
                            password: passC,
                            isBusiness: false,
                            gender: 'male'
                        }),
                        User.create({
                            firstName: 'Ravette',
                            lastName: 'Rawow',
                            email: 'Rav@rav.com',
                            password: passR,
                            isBusiness: false,
                            gender: 'female'
                        }),
                        User.create({
                            firstName: 'Admin',
                            lastName: 'Admin',
                            email: 'barcastNYC@gmail.com',
                            password: passAdmin,
                            isBusiness: false,
                            gender: 'male'
                        })
                    ]);
                })
                .then(() => {
                    return Promise.all([

                        Venue.create({
                            name: 'Jimmy\'s Corner',
                            address: '140 W 44th St',
                            lat: '40.75682592',
                            lon: '-73.98487676'
                        }), Venue.create({
                            name: 'Brass Monkey',
                            address: '55 Little West 12th St',
                            lat: '40.74079551',
                            lon: '-74.00833672'
                        }), Venue.create({
                            name: 'Art Bar',
                            address: '52 8th Ave',
                            lat: '40.73858215',
                            lon: '-74.00359675'
                        }), Venue.create({
                            name: 'Kettle of Fish',
                            address: '59 Christopher St',
                            lat: '40.73373852',
                            lon: '-74.00238276'
                        }), Venue.create({
                            name: 'As Is NYC',
                            address: '734 10th Ave',
                            lat: '40.76468476',
                            lon: '-73.99167919'
                        }), Venue.create({
                            name: 'The Roost',
                            address: '222 Avenue B',
                            lat: '40.72908445',
                            lon: '-73.97863847'
                        }), Venue.create({
                            name: 'Harlem Public',
                            address: '3612 Broadway',
                            lat: '40.82884371',
                            lon: '-73.94867117'
                        }), Venue.create({
                            name: 'Cooper\'s Craft & Kitchen',
                            address: '169 8th Ave',
                            lat: '40.74262532',
                            lon: '-74.00054652'
                        }), Venue.create({
                            name: 'Lightship Frying Pan @ Pier 66 Maritime',
                            address: '205 12th Ave',
                            lat: '40.75235766',
                            lon: '-74.00963933'
                        }), Venue.create({
                            name: 'Angel’s Share',
                            address: '8 Stuyvesant St',
                            lat: '40.73013911',
                            lon: '-73.98922694'
                        }), Venue.create({
                            name: 'The Belfry',
                            address: '222 E 14th St',
                            lat: '40.73286245',
                            lon: '-73.98630005'
                        }), Venue.create({
                            name: 'The Ginger Man',
                            address: '11 E 36th St',
                            lat: '40.74939033',
                            lon: '-73.98286233'
                        }), Venue.create({
                            name: 'The Pony Bar',
                            address: '1444 1st Ave',
                            lat: '40.76976806',
                            lon: '-73.9544034'
                        }), Venue.create({
                            name: 'Barcade',
                            address: '148 W 24th St',
                            lat: '40.74441723',
                            lon: '-73.99442301'
                        }), Venue.create({
                            name: 'Lillie\'s Times Square',
                            address: '249 W 49th St',
                            lat: '40.76163944',
                            lon: '-73.9860877'
                        }), Venue.create({
                            name: 'Rattle N Hum',
                            address: '14 E 33rd St',
                            lat: '40.74735469',
                            lon: '-73.98440041'
                        }), Venue.create({
                            name: 'Draught 55',
                            address: '245 E 55th St',
                            lat: '40.75830687',
                            lon: '-73.96641574'
                        }), Venue.create({
                            name: 'Oscar Wilde',
                            address: '45 W 27th St',
                            lat: '40.74506095',
                            lon: '-73.99022667'
                        }), Venue.create({
                            name: 'Eataly',
                            address: '200 5th Ave',
                            lat: '40.741997',
                            lon: '-73.989623'
                        }), Venue.create({
                            name: 'SPiN New York',
                            address: '48 E 23rd St',
                            lat: '40.74033497',
                            lon: '-73.98676491'
                        }), Venue.create({
                            name: 'e\'s BAR',
                            address: '511 Amsterdam Ave',
                            lat: '40.78678979',
                            lon: '-73.97565381'
                        }), Venue.create({
                            name: 'J.G. Melon',
                            address: '1291 3rd Ave',
                            lat: '40.7710829',
                            lon: '-73.95961162'
                        }), Venue.create({
                            name: 'The Tippler',
                            address: '425 W 15th St',
                            lat: '40.74225425',
                            lon: '-74.00641435'
                        }), Venue.create({
                            name: 'Valhalla',
                            address: '815 9th Ave',
                            lat: '40.76594136',
                            lon: '-73.98704038'
                        }), Venue.create({
                            name: 'The Breslin Bar & Dining Room',
                            address: '16 W 29th St',
                            lat: '40.74583735',
                            lon: '-73.98799265'
                        }), Venue.create({
                            name: 'Otto Enoteca Pizzeria',
                            address: '1 5th Ave',
                            lat: '40.73205609',
                            lon: '-73.99608487'
                        }), Venue.create({
                            name: 'Barn Joo',
                            address: '35 Union Sq W',
                            lat: '40.7367546',
                            lon: '-73.99068832'
                        }), Venue.create({
                            name: 'Old Town Bar',
                            address: '45 E 18th St',
                            lat: '40.73742029',
                            lon: '-73.98935893'
                        }), Venue.create({
                            name: 'Hard Rock Cafe New York',
                            address: '1501 Broadway',
                            lat: '40.75718879',
                            lon: '-73.9866972'
                        }), Venue.create({
                            name: 'Taproom No. 307',
                            address: '307 3rd Ave',
                            lat: '40.73906496',
                            lon: '-73.98302302'
                        }), Venue.create({
                            name: 'Park Avenue Tavern',
                            address: '99 Park Ave',
                            lat: '40.75027309',
                            lon: '-73.97886784'
                        }), Venue.create({
                            name: 'Beer Authority NYC',
                            address: '300 W 40th St',
                            lat: '40.75601013',
                            lon: '-73.99077071'
                        }), Venue.create({
                            name: 'The Park',
                            address: '118 10th Ave',
                            lat: '40.74429593',
                            lon: '-74.00640861'
                        }), Venue.create({
                            name: 'Five Mile Stone',
                            address: '1640 2nd Ave',
                            lat: '40.77724624',
                            lon: '-73.95218284'
                        }), Venue.create({
                            name: 'The Auction House',
                            address: '300 E 89th St',
                            lat: '40.77968538',
                            lon: '-73.95002862'
                        }), Venue.create({
                            name: 'Spring Lounge',
                            address: '48 Spring St',
                            lat: '40.72194135',
                            lon: '-73.99625896'
                        }), Venue.create({
                            name: 'Banc Cafe',
                            address: '431 3rd Ave',
                            lat: '40.743313',
                            lon: '-73.97992594'
                        }), Venue.create({
                            name: 'Bob\'s Your Uncle',
                            address: '929 Columbus Ave',
                            lat: '40.79887115',
                            lon: '-73.96302241'
                        }), Venue.create({
                            name: 'The Three Monkeys',
                            address: '236 W 54th St',
                            lat: '40.76429911',
                            lon: '-73.98300006'
                        }), Venue.create({
                            name: 'Beauty Bar',
                            address: '231 E 14th St',
                            lat: '40.73284071',
                            lon: '-73.98586303'
                        }), Venue.create({
                            name: 'Down the Hatch',
                            address: '179 W 4th St',
                            lat: '40.73233046',
                            lon: '-74.00163991'
                        }), Venue.create({
                            name: 'Tavern29',
                            address: '47 E 29th St',
                            lat: '40.74420197',
                            lon: '-73.98417085'
                        }), Venue.create({
                            name: 'Bar None',
                            address: '98 3rd Ave',
                            lat: '40.73237308',
                            lon: '-73.98796436'
                        }), Venue.create({
                            name: 'Professor Thom\'s',
                            address: '219 2nd Ave',
                            lat: '40.73203003',
                            lon: '-73.98549658'
                        }), Venue.create({
                            name: 'Latitude Bar & Lounge',
                            address: '783 8th Ave',
                            lat: '40.76071845',
                            lon: '-73.98714942'
                        }), Venue.create({
                            name: 'The Stumble Inn',
                            address: '1454 2nd Ave',
                            lat: '40.77138107',
                            lon: '-73.95646042'
                        }), Venue.create({
                            name: 'The Liberty',
                            address: '29 W 35th St',
                            lat: '40.74980915',
                            lon: '-73.98567796'
                        }), Venue.create({
                            name: 'Employees Only',
                            address: '510 Hudson St',
                            lat: '40.7334764',
                            lon: '-74.00621924'
                        }), Venue.create({
                            name: 'PDT (Please Don\'t Tell)',
                            address: '113 Saint Marks Pl',
                            lat: '40.72713478',
                            lon: '-73.98382187'
                        }), Venue.create({
                            name: 'The Rusty Knot',
                            address: '425 West St',
                            lat: '40.73522028',
                            lon: '-74.01000085'
                        }), Venue.create({
                            name: 'Death & Co.',
                            address: '433 E 6th St',
                            lat: '40.72581151',
                            lon: '-73.98489475'
                        }), Venue.create({
                            name: 'Barcade',
                            address: '6 Saint Marks Pl',
                            lat: '40.72935088',
                            lon: '-73.98946883'
                        }), Venue.create({
                            name: 'Cooper\'s Craft and Kitchen',
                            address: '87 2nd Ave',
                            lat: '40.72690658',
                            lon: '-73.98892851'
                        }), Venue.create({
                            name: 'Peter McManus',
                            address: '152 7th Ave',
                            lat: '40.74168338',
                            lon: '-73.99758842'
                        }), Venue.create({
                            name: 'Top Hops',
                            address: '94 Orchard St',
                            lat: '40.71841212',
                            lon: '-73.98989439'
                        }), Venue.create({
                            name: 'Fat Buddha',
                            address: '212 Avenue A',
                            lat: '40.72986456',
                            lon: '-73.98054421'
                        }), Venue.create({
                            name: 'd.b.a.',
                            address: '41 1st Ave',
                            lat: '40.72430769',
                            lon: '-73.98797584'
                        }), Venue.create({
                            name: 'The Wren',
                            address: '344 Bowery',
                            lat: '40.72629606',
                            lon: '-73.99167746'
                        }), Venue.create({
                            name: 'Tom & Jerry\'s',
                            address: '288 Elizabeth St',
                            lat: '40.72442672',
                            lon: '-73.99335321'
                        }), Venue.create({
                            name: 'Spitzer\'s Corner',
                            address: '101 Rivington St',
                            lat: '40.72006791',
                            lon: '-73.98831323'
                        }), Venue.create({
                            name: 'Fat Cat',
                            address: '75 Christopher St',
                            lat: '40.73365152',
                            lon: '-74.00312046'
                        }), Venue.create({
                            name: 'Ear Inn',
                            address: '326 Spring St',
                            lat: '40.72607458',
                            lon: '-74.00936963'
                        }), Venue.create({
                            name: 'Pioneers Bar',
                            address: '138 W 29th St',
                            lat: '40.74735243',
                            lon: '-73.99179242'
                        }), Venue.create({
                            name: 'One Mile House',
                            address: '10 Delancey St',
                            lat: '40.72018117',
                            lon: '-73.99324991'
                        }), Venue.create({
                            name: 'The Mean Fiddler',
                            address: '266 W 47th St',
                            lat: '40.76036455',
                            lon: '-73.98713794'
                        }), Venue.create({
                            name: 'The Half King',
                            address: '505 W 23rd St',
                            lat: '40.74780321',
                            lon: '-74.00447475'
                        }), Venue.create({
                            name: 'Apothéke',
                            address: '9 Doyers St',
                            lat: '40.71448179',
                            lon: '-73.99800735'
                        }), Venue.create({
                            name: 'Ace Bar',
                            address: '531 E 5th St',
                            lat: '40.7244185',
                            lon: '-73.98292546'
                        }), Venue.create({
                            name: 'Hill & Dale',
                            address: '115 Allen St',
                            lat: '40.71953189',
                            lon: '-73.99064579'
                        }), Venue.create({
                            name: 'Beauty & Essex',
                            address: '146 Essex St',
                            lat: '40.72036369',
                            lon: '-73.98708344'
                        }), Venue.create({
                            name: 'The 13th Step',
                            address: '149 2nd Ave',
                            lat: '40.72947764',
                            lon: '-73.98718386'
                        }), Venue.create({
                            name: 'Hotel Chantelle',
                            address: '92 Ludlow St',
                            lat: '40.71855466',
                            lon: '-73.98899738'
                        }), Venue.create({
                            name: '169 Bar',
                            address: '169 E Broadway',
                            lat: '40.71402088',
                            lon: '-73.98987293'
                        }), Venue.create({
                            name: 'Stout',
                            address: '60 E 41st St',
                            lat: '40.75170752',
                            lon: '-73.97877123'
                        }), Venue.create({
                            name: 'Smith\'s Bar & Restaurant',
                            address: '701 8th Ave',
                            lat: '40.75860102',
                            lon: '-73.98891437'
                        }), Venue.create({
                            name: 'Offside Tavern',
                            address: '137 W 14th St',
                            lat: '40.73816546',
                            lon: '-73.99857029'
                        }), Venue.create({
                            name: 'The Dead Rabbit',
                            address: '30 Water St',
                            lat: '40.70299656',
                            lon: '-74.01095915'
                        }), Venue.create({
                            name: 'The Half Pint',
                            address: '76 W 3rd St',
                            lat: '40.729658',
                            lon: '-73.998515'
                        }), Venue.create({
                            name: 'Fraunces Tavern',
                            address: '54 Pearl St',
                            lat: '40.70352594',
                            lon: '-74.01139528'
                        }),
                        Venue.create({
                            name: 'Warren 77',
                            address: '77 Warren St',
                            lat: '40.7152048',
                            lon: '-74.01033162'
                        }), Venue.create({
                            name: 'Clinton Hall South Street Seaport',
                            address: '19 Fulton St',
                            lat: '40.70691071',
                            lon: '-74.00354892'
                        }), Venue.create({
                            name: 'Mickey Spillane\'s',
                            address: '350 W 49th St',
                            lat: '40.76276383',
                            lon: '-73.98939247'
                        }), Venue.create({
                            name: 'Blarney Rock Pub',
                            address: '137 W 33rd St',
                            lat: '40.74995788',
                            lon: '-73.99016739'
                        }), Venue.create({
                            name: 'The Penny Farthing',
                            address: '103 3rd Ave',
                            lat: '40.73253292',
                            lon: '-73.98775202'
                        }), Venue.create({
                            name: '1020 Bar',
                            address: '1020 Amsterdam Ave',
                            lat: '40.80304545',
                            lon: '-73.96390476'
                        }), Venue.create({
                            name: 'La Linea',
                            address: '15 1st Ave',
                            lat: '40.72355',
                            lon: '-73.988554'
                        }), Venue.create({
                            name: 'The Malt House FiDi',
                            address: '9 Maiden Ln',
                            lat: '40.70940423',
                            lon: '-74.0098419'
                        }), Venue.create({
                            name: 'Von',
                            address: '3 Bleecker St',
                            lat: '40.72544563',
                            lon: '-73.99261951'
                        }), Venue.create({
                            name: 'Ulysses Folk House',
                            address: '95 Pearl St',
                            lat: '40.70443641',
                            lon: '-74.01012361'
                        }), Venue.create({
                            name: 'Off The Wagon Bar & Grill',
                            address: '109 Macdougal St',
                            lat: '40.72988846',
                            lon: '-74.0006127'
                        }), Venue.create({
                            name: 'SideBAR',
                            address: '118 E 15th St',
                            lat: '40.73466223',
                            lon: '-73.98840053'
                        }), Venue.create({
                            name: 'P.J. Clarke\'s',
                            address: '915 3rd Ave',
                            lat: '40.75893774',
                            lon: '-73.96846226'
                        }), Venue.create({
                            name: 'Fairfax',
                            address: '234 W 4th St',
                            lat: '40.73424673',
                            lon: '-74.00298432'
                        }), Venue.create({
                            name: 'Bleecker Street Bar',
                            address: '56 Bleecker St',
                            lat: '40.7261384',
                            lon: '-73.99496581'
                        }), Venue.create({
                            name: 'Lillie\'s Union Square',
                            address: '13 E 17th St',
                            lat: '40.73759802',
                            lon: '-73.99116039'
                        }), Venue.create({
                            name: 'Ryan\'s Daughter',
                            address: '350 E 85th St',
                            lat: '40.77636185',
                            lon: '-73.95041417'
                        }), Venue.create({
                            name: 'Keg No. 229',
                            address: '229 Front St',
                            lat: '40.7075992',
                            lon: '-74.00197246'
                        }), Venue.create({
                            name: 'Pete\'s Tavern',
                            address: '129 E 18th St',
                            lat: '40.73645856',
                            lon: '-73.98689117'
                        }), Venue.create({
                            name: 'The Flying Cock',
                            address: '497 3rd Ave',
                            lat: '40.74540842',
                            lon: '-73.97838852'
                        }), Venue.create({
                            name: 'Broome Street Bar',
                            address: '363 W Broadway',
                            lat: '40.72331594',
                            lon: '-74.0032003'
                        }), Venue.create({
                            name: 'Kava Cafe - MiMA',
                            address: '470 W 42nd St',
                            lat: '40.75918962',
                            lon: '-73.99454331'
                        }), Venue.create({
                            name: 'Le Baratin',
                            address: '26 Greenwich Ave',
                            lat: '40.73483104',
                            lon: '-74.00003887'
                        }), Venue.create({
                            name: 'Nelly Spillanes',
                            address: '18 E 33rd St',
                            lat: '40.74733543',
                            lon: '-73.98413589'
                        }), Venue.create({
                            name: 'The Winslow',
                            address: '243 E 14th St',
                            lat: '40.73265723',
                            lon: '-73.98534202'
                        }), Venue.create({
                            name: 'Proper West',
                            address: '54 W 39th St',
                            lat: '40.75263546',
                            lon: '-73.98473482'
                        }), Venue.create({
                            name: 'No Fun',
                            address: '161 Ludlow St',
                            lat: '40.72145329',
                            lon: '-73.987813'
                        }), Venue.create({
                            name: 'Haymaker Bar and Kitchen',
                            address: '252 W 29th St',
                            lat: '40.7489954',
                            lon: '-73.99539105'
                        }), Venue.create({
                            name: 'Lansdowne Road',
                            address: '599 10th Ave',
                            lat: '40.76066702',
                            lon: '-73.99494767'
                        }), Venue.create({
                            name: 'Wilfie & Nell',
                            address: '228 W 4th St',
                            lat: '40.73400375',
                            lon: '-74.00299564'
                        }), Venue.create({
                            name: '3 Sheets Saloon',
                            address: '134 W 3rd St',
                            lat: '40.730887',
                            lon: '-74.001079'
                        }), Venue.create({
                            name: 'Johnny Utah\'s',
                            address: '25 W 51st St Frnt 3',
                            lat: '40.75969029',
                            lon: '-73.97834556'
                        }), Venue.create({
                            name: 'Jones Wood Foundry',
                            address: '401 E 76th St',
                            lat: '40.77035451',
                            lon: '-73.95366686'
                        }), Venue.create({
                            name: 'Amity Hall',
                            address: '80 W 3rd St',
                            lat: '40.729751',
                            lon: '-73.9987545'
                        }), Venue.create({
                            name: 'The Dead Poet',
                            address: '450 Amsterdam Ave',
                            lat: '40.78482',
                            lon: '-73.977128'
                        }), Venue.create({
                            name: 'McGee\'s Pub',
                            address: '240 W 55th St',
                            lat: '40.76500642',
                            lon: '-73.98313522'
                        }), Venue.create({
                            name: 'Gramercy Tavern',
                            address: '42 E 20th St',
                            lat: '40.73857556',
                            lon: '-73.98832798'
                        }), Venue.create({
                            name: 'Earl\'s Beer & Cheese',
                            address: '1259 Park Ave',
                            lat: '40.78737211',
                            lon: '-73.95185844'
                        }), Venue.create({
                            name: 'Harlem Tavern',
                            address: '2153 Frederick Douglass Blvd',
                            lat: '40.80469815',
                            lon: '-73.95543297'
                        }), Venue.create({
                            name: 'The NoMad Restaurant',
                            address: '1170 Broadway',
                            lat: '40.74507434',
                            lon: '-73.98856122'
                        }), Venue.create({
                            name: 'Jeffrey\'s Grocery',
                            address: '172 Waverly Pl',
                            lat: '40.73374808',
                            lon: '-74.00124968'
                        }), Venue.create({
                            name: 'District Social',
                            address: '252 W 37th St',
                            lat: '40.75384779',
                            lon: '-73.991485'
                        }), Venue.create({
                            name: 'Playwright Celtic Pub',
                            address: '732 8th Ave',
                            lat: '40.75950429',
                            lon: '-73.98792419'
                        }), Venue.create({
                            name: 'The Standard Grill',
                            address: '848 Washington St',
                            lat: '40.74068911',
                            lon: '-74.00761843'
                        }), Venue.create({
                            name: 'The Smith',
                            address: '55 3rd Ave',
                            lat: '40.73115587',
                            lon: '-73.98872765'
                        }), Venue.create({
                            name: 'Dear Irving',
                            address: '55 Irving Pl',
                            lat: '40.73608866',
                            lon: '-73.98732377'
                        }), Venue.create({
                            name: 'The NoMad Bar',
                            address: '10 W 28th St',
                            lat: '40.74505649',
                            lon: '-73.98840696'
                        }), Venue.create({
                            name: 'The Smith',
                            address: '1900 Broadway',
                            lat: '40.77151499',
                            lon: '-73.98191214'
                        }), Venue.create({
                            name: 'PH-D at Dream Downtown',
                            address: '355 W 16th St',
                            lat: '40.74239352',
                            lon: '-74.00330983'
                        }), Venue.create({
                            name: 'Junior\'s Restaurant & Bakery',
                            address: '1515 Broadway',
                            lat: '40.75845792',
                            lon: '-73.98653535'
                        }), Venue.create({
                            name: 'Hibernia Bar',
                            address: '401 W 50th St',
                            lat: '40.76364626',
                            lon: '-73.98938763'
                        }), Venue.create({
                            name: 'Pouring Ribbons',
                            address: '225 Avenue B Fl 2',
                            lat: '40.72909326',
                            lon: '-73.9780331'
                        }), Venue.create({
                            name: 'The Penrose',
                            address: '1590 2nd Ave',
                            lat: '40.7754543',
                            lon: '-73.95330917'
                        }), Venue.create({
                            name: 'Park Avenue Autumn/Winter/Spring/Summer',
                            address: '360 Park Ave S',
                            lat: '40.74211822',
                            lon: '-73.98517432'
                        }), Venue.create({
                            name: 'Tanner Smiths',
                            address: '204 W 55th St',
                            lat: '40.76448552',
                            lon: '-73.98165211'
                        }), Venue.create({
                            name: 'Tavern on the Green',
                            address: '1 Tavern on the Green, 67th Street & Central Park West',
                            lat: '40.77210813',
                            lon: '-73.97742748'
                        }), Venue.create({
                            name: 'The Rum House',
                            address: '228 W 47th St',
                            lat: '40.75987613',
                            lon: '-73.98623692'
                        }), Venue.create({
                            name: 'Penelope',
                            address: '159 Lexington Ave',
                            lat: '40.74388129',
                            lon: '-73.9816284'
                        }), Venue.create({
                            name: 'Porchlight',
                            address: '271 11th Ave',
                            lat: '40.75200428',
                            lon: '-74.00473477'
                        }), Venue.create({
                            name: 'Iron Horse NYC',
                            address: '32 Cliff St',
                            lat: '40.70836184',
                            lon: '-74.0049085'
                        }), Venue.create({
                            name: '21 Club',
                            address: '21 W 52nd St',
                            lat: '40.76041672',
                            lon: '-73.9776237'
                        }), Venue.create({
                            name: 'The Roof',
                            address: '124 W 57th St',
                            lat: '40.76472303',
                            lon: '-73.9784958'
                        }), Venue.create({
                            name: 'The Rose Bar',
                            address: 'New York',
                            lat: '40.73851699',
                            lon: '-73.98552527'
                        }), Venue.create({
                            name: 'Stout',
                            address: '133 W 33rd St',
                            lat: '40.74983858',
                            lon: '-73.99009352'
                        }), Venue.create({
                            name: 'Legends New York',
                            address: '600 West 33rd St',
                            lat: '40.74791127',
                            lon: '-73.98575842'
                        }), Venue.create({
                            name: 'Gallow Green',
                            address: '542 W 27th St',
                            lat: '40.75073013',
                            lon: '-74.00413618'
                        }), Venue.create({
                            name: 'The Happiest Hour',
                            address: '121 W 10th St',
                            lat: '40.7347471',
                            lon: '-73.9997099'
                        }), Venue.create({
                            name: 'McSorley\'s Old Ale House',
                            address: '15 E 7th St',
                            lat: '40.72860235',
                            lon: '-73.98996152'
                        }), Venue.create({
                            name: 'The Watering Hole',
                            address: '106 E 19th St',
                            lat: '40.7373987',
                            lon: '-73.98744313'
                        }), Venue.create({
                            name: 'Casellula',
                            address: '401 W 52nd St',
                            lat: '40.7649333',
                            lon: '-73.98841738'
                        }), Venue.create({
                            name: 'Barbuto',
                            address: '775 Washington St',
                            lat: '40.73771386',
                            lon: '-74.00801539'
                        }), Venue.create({
                            name: 'Eleven Madison Park',
                            address: '11 Madison Ave',
                            lat: '40.74164832',
                            lon: '-73.98714781'
                        }), Venue.create({
                            name: '230 Fifth Rooftop Lounge',
                            address: '230 5th Ave',
                            lat: '40.74421528',
                            lon: '-73.98853804'
                        }), Venue.create({
                            name: 'Jack Doyle\'s',
                            address: '240 W 35th St',
                            lat: '40.75228815',
                            lon: '-73.99178986'
                        }), Venue.create({
                            name: 'Buddakan',
                            address: '75 9th Ave',
                            lat: '40.74224089',
                            lon: '-74.00460673'
                        }), Venue.create({
                            name: 'Refinery Rooftop',
                            address: '63 W 38th St',
                            lat: '40.75217013',
                            lon: '-73.98549473'
                        }), Venue.create({
                            name: 'Alta',
                            address: '64 W 10th St',
                            lat: '40.7345366',
                            lon: '-73.99822542'
                        }), Venue.create({
                            name: 'Belgian Beer Café',
                            address: '220 5th Ave',
                            lat: '40.74355592',
                            lon: '-73.98829124'
                        }), Venue.create({
                            name: 'Maysville',
                            address: '17 W 26th St',
                            lat: '40.74406763',
                            lon: '-73.98962428'
                        }), Venue.create({
                            name: 'The Marlton Hotel',
                            address: '5 W 8th St',
                            lat: '40.73256399',
                            lon: '-73.99687996'
                        }),
                        Venue.create({
                            name: 'Co.',
                            address: '230 9th Ave',
                            lat: '40.74716991',
                            lon: '-74.00063565'
                        }), Venue.create({
                            name: 'Toad Hall',
                            address: '57 Grand St',
                            lat: '40.72230108',
                            lon: '-74.00358089'
                        }), Venue.create({
                            name: 'The Spaniard',
                            address: '190 W 4th St',
                            lat: '40.73285051',
                            lon: '-74.00213377'
                        }), Venue.create({
                            name: 'The Brazen Fox',
                            address: '106 3rd Ave',
                            lat: '40.73268933',
                            lon: '-73.9877445'
                        }), Venue.create({
                            name: 'Room Service',
                            address: '690 9th Ave',
                            lat: '40.76182116',
                            lon: '-73.99008204'
                        }), Venue.create({
                            name: 'Kobrick Coffee Co.',
                            address: '24 9th Ave',
                            lat: '40.74033655',
                            lon: '-74.00569308'
                        }), Venue.create({
                            name: 'O\'Hanlon\'s Bar',
                            address: '349 E 14th St',
                            lat: '40.73154514',
                            lon: '-73.98282789'
                        }), Venue.create({
                            name: 'Trump Bar',
                            address: '725 5th Ave',
                            lat: '40.76239566',
                            lon: '-73.97379378'
                        }), Venue.create({
                            name: 'Rye House',
                            address: '11 W 17th St',
                            lat: '40.73830504',
                            lon: '-73.99300887'
                        }), Venue.create({
                            name: 'Bea',
                            address: '403 W 43rd St',
                            lat: '40.75919665',
                            lon: '-73.99253471'
                        }), Venue.create({
                            name: 'Clyde Frazier\'s Wine and Dine',
                            address: '485 10th Ave',
                            lat: '40.75682308',
                            lon: '-73.99753478'
                        }), Venue.create({
                            name: 'Public House',
                            address: '140 E 41st St',
                            lat: '40.75057612',
                            lon: '-73.97616462'
                        }), Venue.create({
                            name: 'Dutch Fred\'s',
                            address: '313 W 47th',
                            lat: '40.76070039',
                            lon: '-73.98791379'
                        }), Venue.create({
                            name: 'The Jeffrey Craft Beer & Bites',
                            address: '311 E 60th St',
                            lat: '40.76090722',
                            lon: '-73.96305773'
                        }), Venue.create({
                            name: 'Le Poisson Rouge',
                            address: '158 Bleecker St',
                            lat: '40.72851839',
                            lon: '-73.99992406'
                        }), Venue.create({
                            name: 'The Empire Hotel',
                            address: '44 W 63rd St',
                            lat: '40.77165518',
                            lon: '-73.98236302'
                        }), Venue.create({
                            name: 'P.J. Clarke\'s',
                            address: '44 W 63rd St',
                            lat: '40.77180196',
                            lon: '-73.98290824'
                        }), Venue.create({
                            name: 'Sky Room',
                            address: '330 W 40th St',
                            lat: '40.75650577',
                            lon: '-73.99241777'
                        }), Venue.create({
                            name: 'The Perfect Pint',
                            address: '123 W 45th St',
                            lat: '40.75724776',
                            lon: '-73.9837978'
                        }), Venue.create({
                            name: 'Hardware Bar',
                            address: '697 10th Ave',
                            lat: '40.7631821',
                            lon: '-73.99289006'
                        }), Venue.create({
                            name: 'Haven at the Sanctuary Hotel',
                            address: '132 W 47th St',
                            lat: '40.75868187',
                            lon: '-73.983177'
                        }), Venue.create({
                            name: 'The Biergarten at The Standard',
                            address: '848 Washington St',
                            lat: '40.74055798',
                            lon: '-74.00777996'
                        }), Venue.create({
                            name: 'Café Select',
                            address: '212 Lafayette St',
                            lat: '40.721683',
                            lon: '-73.99779886'
                        }), Venue.create({
                            name: 'Rudy\'s Bar & Grill',
                            address: '627 9th Ave',
                            lat: '40.75996804',
                            lon: '-73.99149955'
                        }), Venue.create({
                            name: 'Treadwell Park',
                            address: '1125 1st Ave',
                            lat: '40.76146112',
                            lon: '-73.96076081'
                        }), Venue.create({
                            name: 'Fools Gold NYC',
                            address: '145 E Houston St',
                            lat: '40.72316393',
                            lon: '-73.98969823'
                        }), Venue.create({
                            name: 'Smithfield Hall',
                            address: '138 W 25th St',
                            lat: '40.74486899',
                            lon: '-73.99351799'
                        }), Venue.create({
                            name: 'The Anchor',
                            address: '310 Spring St',
                            lat: '40.72595068',
                            lon: '-74.00856215'
                        }), Venue.create({
                            name: 'The Wayland',
                            address: '700 E 9th St',
                            lat: '40.7252389',
                            lon: '-73.97804712'
                        }), Venue.create({
                            name: 'Loverboy',
                            address: '127 Avenue C',
                            lat: '40.72473112',
                            lon: '-73.97850315'
                        }), Venue.create({
                            name: 'Saxon + Parole',
                            address: '316 Bowery',
                            lat: '40.72516293',
                            lon: '-73.99215952'
                        }), Venue.create({
                            name: 'Good Night Sonny',
                            address: '134 1st Ave',
                            lat: '40.72766789',
                            lon: '-73.98521382'
                        }), Venue.create({
                            name: 'Mercer Kitchen',
                            address: '99 Prince St',
                            lat: '40.72474364',
                            lon: '-73.99866156'
                        }), Venue.create({
                            name: 'Turtle Bay NYC',
                            address: '987 2nd Ave',
                            lat: '40.75635319',
                            lon: '-73.96767593'
                        }), Venue.create({
                            name: 'The Perfect Pint',
                            address: '203 E 45th St',
                            lat: '40.7526659',
                            lon: '-73.9726551'
                        }), Venue.create({
                            name: 'The Library at The Public',
                            address: '425 Lafayette St',
                            lat: '40.72926497',
                            lon: '-73.99190334'
                        }), Venue.create({
                            name: 'Ghost Donkey',
                            address: '4 Bleecker St',
                            lat: '40.72529526',
                            lon: '-73.99251231'
                        }), Venue.create({
                            name: 'Pegu Club',
                            address: '77 W Houston St',
                            lat: '40.72675799',
                            lon: '-73.99956096'
                        }), Venue.create({
                            name: 'Fanelli Cafe',
                            address: '94 Prince St',
                            lat: '40.724607',
                            lon: '-73.998751'
                        }), Venue.create({
                            name: 'Heartland Brewery',
                            address: '350 5th Ave',
                            lat: '40.74839867',
                            lon: '-73.98487676'
                        }), Venue.create({
                            name: 'Delicatessen',
                            address: '54 Prince St',
                            lat: '40.7235191',
                            lon: '-73.99634376'
                        }), Venue.create({
                            name: 'YN',
                            address: '227 Mott St',
                            lat: '40.72249204',
                            lon: '-73.99512497'
                        }), Venue.create({
                            name: 'Boilermaker',
                            address: '13 1st Ave',
                            lat: '40.72322183',
                            lon: '-73.98847068'
                        }), Venue.create({
                            name: 'Mother\'s Ruin',
                            address: '18 Spring St',
                            lat: '40.72131099',
                            lon: '-73.99501204'
                        }), Venue.create({
                            name: 'Nitecap',
                            address: '151 Rivington St',
                            lat: '40.71918665',
                            lon: '-73.98569137'
                        }), Venue.create({
                            name: 'P.J. Carney\'s Pub',
                            address: '906 7th Ave',
                            lat: '40.76582282',
                            lon: '-73.979825'
                        }), Venue.create({
                            name: 'Butterfield 8',
                            address: '5 E 38th St',
                            lat: '40.75081647',
                            lon: '-73.98207867'
                        }), Venue.create({
                            name: 'Iron Bar & Lounge',
                            address: '713 8th Ave',
                            lat: '40.7591536',
                            lon: '-73.98848156'
                        }), Venue.create({
                            name: 'JIMMY at The James',
                            address: '15 Thompson St.',
                            lat: '40.72258431',
                            lon: '-74.0048707'
                        }), Venue.create({
                            name: 'Sel Rrose',
                            address: '1 Delancey St',
                            lat: '40.7200059',
                            lon: '-73.99391234'
                        }), Venue.create({
                            name: 'Bowlmor Chelsea Piers',
                            address: 'Chelsea Piers-Pier 60',
                            lat: '40.746488',
                            lon: '-74.008461'
                        }), Venue.create({
                            name: 'Finnerty\'s',
                            address: '221 2nd Ave',
                            lat: '40.73211864',
                            lon: '-73.98541242'
                        }), Venue.create({
                            name: 'Tuttles Bar & Grill',
                            address: '735 2nd Ave',
                            lat: '40.74819209',
                            lon: '-73.97353638'
                        }), Venue.create({
                            name: 'Dive 75',
                            address: '101 W 75th St',
                            lat: '40.7794718',
                            lon: '-73.97769702'
                        }), Venue.create({
                            name: 'Tonic',
                            address: '727 7th Ave',
                            lat: '40.7600187',
                            lon: '-73.98401589'
                        }), Venue.create({
                            name: 'The Folly',
                            address: '92 W Houston St',
                            lat: '40.7270966',
                            lon: '-74.00009867'
                        }), Venue.create({
                            name: 'Hofbräu Bierhaus NYC',
                            address: '712 3rd Ave',
                            lat: '40.75268633',
                            lon: '-73.97336662'
                        }), Venue.create({
                            name: 'World Cup Cafe',
                            address: '956 Lexington Ave',
                            lat: '40.76880199',
                            lon: '-73.96330679'
                        }), Venue.create({
                            name: 'Hammerstein Ballroom',
                            address: '311 W 34th St',
                            lat: '40.75292655',
                            lon: '-73.99489695'
                        }), Venue.create({
                            name: 'Hudson Clearwater',
                            address: '447 Hudson St',
                            lat: '40.73100068',
                            lon: '-74.00683764'
                        }), Venue.create({
                            name: 'Mr. Fong\'s',
                            address: '40 Market St',
                            lat: '40.71234871',
                            lon: '-73.99429477'
                        }), Venue.create({
                            name: 'Reichenbach Hall',
                            address: '5 W 37th St',
                            lat: '40.7509222',
                            lon: '-73.98414215'
                        }), Venue.create({
                            name: 'Parkside Lounge',
                            address: '317 E Houston St',
                            lat: '40.72108775',
                            lon: '-73.98317385'
                        }), Venue.create({
                            name: 'Boxers NYC',
                            address: '37 W 20th St',
                            lat: '40.74078734',
                            lon: '-73.99331877'
                        }), Venue.create({
                            name: 'Stone Street Tavern',
                            address: '52 Stone St',
                            lat: '40.7043685',
                            lon: '-74.01020072'
                        }), Venue.create({
                            name: 'The Dutch',
                            address: '131 Sullivan St',
                            lat: '40.72651075',
                            lon: '-74.00214136'
                        }), Venue.create({
                            name: 'Black Tap',
                            address: '529 Broome St',
                            lat: '40.723897',
                            lon: '-74.004221'
                        }), Venue.create({
                            name: 'Death Ave',
                            address: '315 10th Ave',
                            lat: '40.7511404',
                            lon: '-74.00197569'
                        }), Venue.create({
                            name: 'Mr. Purple',
                            address: '180 Orchard St',
                            lat: '40.72173744',
                            lon: '-73.98800687'
                        }), Venue.create({
                            name: 'The Garret',
                            address: '296 Bleecker St',
                            lat: '40.73233478',
                            lon: '-74.00368179'
                        }), Venue.create({
                            name: 'District Tap House',
                            address: '246 W 38th St',
                            lat: '40.75419165',
                            lon: '-73.9903717'
                        }), Venue.create({
                            name: 'Billymark\'s West',
                            address: '332 9th Ave',
                            lat: '40.75021898',
                            lon: '-73.99853098'
                        }), Venue.create({
                            name: 'Attaboy',
                            address: '134 Eldridge St',
                            lat: '40.71898117',
                            lon: '-73.99154017'
                        }), Venue.create({
                            name: 'Sláinte',
                            address: '304 Bowery',
                            lat: '40.72473921',
                            lon: '-73.99261289'
                        }), Venue.create({
                            name: 'Flatiron Hall',
                            address: '38 W 26th St',
                            lat: '40.74448805',
                            lon: '-73.99059854'
                        }), Venue.create({
                            name: 'O\'Reilly\'s Irish Pub',
                            address: '54 W 31st St',
                            lat: '40.7476958',
                            lon: '-73.98875424'
                        }), Venue.create({
                            name: 'East End Bar & Grill',
                            address: '1664 1st Ave',
                            lat: '40.7774049',
                            lon: '-73.94893499'
                        }), Venue.create({
                            name: 'AWOL Bar & Grill',
                            address: '337 3rd Ave',
                            lat: '40.74002654',
                            lon: '-73.98216526'
                        }), Venue.create({
                            name: 'Blacktail',
                            address: '22 Battery Pl',
                            lat: '40.7044747',
                            lon: '-74.01734797'
                        }), Venue.create({
                            name: 'Niles NYC Bar & Restaurant',
                            address: '371 7th Ave',
                            lat: '40.74881834',
                            lon: '-73.99230879'
                        }),
                        Venue.create({
                            name: 'Stonewall Inn',
                            address: '53 Christopher St',
                            lat: '40.73369431',
                            lon: '-74.00212124'
                        }), Venue.create({
                            name: 'Stonewall Inn',
                            address: '53 Christopher St',
                            lat: '40.73369431',
                            lon: '-74.00212124'
                        }), Venue.create({
                            name: 'Restaurant Marc Forgione',
                            address: '134 Reade St',
                            lat: '40.71637984',
                            lon: '-74.00962933'
                        }), Venue.create({
                            name: 'Grand Banks',
                            address: 'Pier 25',
                            lat: '40.72030029',
                            lon: '-74.01602652'
                        }), Venue.create({
                            name: 'The Chester',
                            address: '18 9th Ave',
                            lat: '40.74011306',
                            lon: '-74.0056587'
                        }), Venue.create({
                            name: 'Little King',
                            address: '749 Metropolitan Ave',
                            lat: '40.71461698',
                            lon: '-73.9441018'
                        }), Venue.create({
                            name: 'The Ainsworth',
                            address: '122 W 26th St',
                            lat: '40.74525975',
                            lon: '-73.99247516'
                        }), Venue.create({
                            name: 'SLATE',
                            address: '54 W 21st St',
                            lat: '40.74139454',
                            lon: '-73.99298592'
                        }), Venue.create({
                            name: '5 Napkin Burger',
                            address: '630 9th Ave',
                            lat: '40.76023599',
                            lon: '-73.99121835'
                        }), Venue.create({
                            name: 'Rosemary’s',
                            address: '18 Greenwich Ave',
                            lat: '40.73479741',
                            lon: '-73.9998588'
                        }), Venue.create({
                            name: 'Uva',
                            address: '1486 2nd Ave',
                            lat: '40.77224358',
                            lon: '-73.95575441'
                        }), Venue.create({
                            name: 'Corner Bistro',
                            address: '331 W 4th St',
                            lat: '40.73802277',
                            lon: '-74.00373995'
                        }), Venue.create({
                            name: 'Sweet and Vicious',
                            address: '5 Spring St',
                            lat: '40.72123672',
                            lon: '-73.9942542'
                        }), Venue.create({
                            name: 'Sweetwater Social',
                            address: '643 Broadway',
                            lat: '40.72659629',
                            lon: '-73.99589619'
                        }), Venue.create({
                            name: 'Distilled',
                            address: '211 W Broadway',
                            lat: '40.71892639',
                            lon: '-74.00672015'
                        }), Venue.create({
                            name: 'Morandi',
                            address: '211 Waverly Pl',
                            lat: '40.7353238',
                            lon: '-74.00177121'
                        }), Venue.create({
                            name: 'The Crown',
                            address: '50 Bowery',
                            lat: '40.71598652',
                            lon: '-73.99665956'
                        }), Venue.create({
                            name: 'The Lately',
                            address: '357 W 16th St',
                            lat: '40.74195952',
                            lon: '-74.00386521'
                        }), Venue.create({
                            name: 'Lido Harlem',
                            address: '2168 Frederick Douglass Blvd',
                            lat: '40.80498682',
                            lon: '-73.95488536'
                        }), Venue.create({
                            name: 'ABC Cocina',
                            address: '38 E 19th St',
                            lat: '40.7381691',
                            lon: '-73.98916483'
                        }), Venue.create({
                            name: 'Bottom\'s Up/Vodka Soda',
                            address: '315 W 46th St',
                            lat: '40.76018094',
                            lon: '-73.98868055'
                        }), Venue.create({
                            name: 'The Flying Puck',
                            address: '364 7th Ave',
                            lat: '40.74868626',
                            lon: '-73.99234891'
                        }), Venue.create({
                            name: 'Casa Lever',
                            address: '390 Park Ave',
                            lat: '40.75916374',
                            lon: '-73.97301221'
                        }), Venue.create({
                            name: 'Mudville Restaurant & Tap House',
                            address: '126 Chambers St',
                            lat: '40.715284',
                            lon: '-74.008876'
                        }), Venue.create({
                            name: 'Harry\'s Cafe and Steak',
                            address: '1 Hanover Sq',
                            lat: '40.70455849',
                            lon: '-74.00974599'
                        }), Venue.create({
                            name: '7B Horseshoe Bar aka Vazacs',
                            address: '108 Avenue B',
                            lat: '40.72507995',
                            lon: '-73.98132997'
                        }), Venue.create({
                            name: 'Phebe\'s',
                            address: '359 Bowery',
                            lat: '40.72694627',
                            lon: '-73.99148807'
                        }), Venue.create({
                            name: 'Pulquería',
                            address: '11 Doyers St',
                            lat: '40.71445102',
                            lon: '-73.99800116'
                        }), Venue.create({
                            name: 'Bill\'s Bar & Burger',
                            address: '16 W 51st St',
                            lat: '40.75924321',
                            lon: '-73.97758524'
                        }), Venue.create({
                            name: 'Brother Jimmy\'s BBQ',
                            address: '181 Lexington Ave',
                            lat: '40.74448892',
                            lon: '-73.98093396'
                        }), Venue.create({
                            name: 'The DL',
                            address: '95 Delancey St',
                            lat: '40.71866214',
                            lon: '-73.98925563'
                        }), Venue.create({
                            name: 'Loreley Beer Garden',
                            address: '7 Rivington St',
                            lat: '40.72112804',
                            lon: '-73.99304867'
                        }), Venue.create({
                            name: 'Boxers HK Sportsbar',
                            address: '742 9th Ave',
                            lat: '40.76349294',
                            lon: '-73.98868203'
                        }), Venue.create({
                            name: 'Olio e Piú',
                            address: '3 Greenwich Ave',
                            lat: '40.73387296',
                            lon: '-73.99959875'
                        }), Venue.create({
                            name: 'B Bar & Grill',
                            address: '40 E 4th St',
                            lat: '40.72706973',
                            lon: '-73.99190605'
                        }), Venue.create({
                            name: 'Botanica Bar',
                            address: '47 E Houston St',
                            lat: '40.72488011',
                            lon: '-73.99468461'
                        }), Venue.create({
                            name: 'Central Bar',
                            address: '109 E 9th St',
                            lat: '40.73044069',
                            lon: '-73.99009352'
                        }), Venue.create({
                            name: 'Tonic East',
                            address: '411 3rd Ave',
                            lat: '40.74252389',
                            lon: '-73.98034856'
                        }), Venue.create({
                            name: 'Houston Hall',
                            address: '222 W Houston St',
                            lat: '40.72867347',
                            lon: '-74.00473773'
                        }), Venue.create({
                            name: 'Vapiano',
                            address: '113 University Pl',
                            lat: '40.73453432',
                            lon: '-73.99213657'
                        }), Venue.create({
                            name: 'Pieces Bar',
                            address: '8 Christopher St',
                            lat: '40.7339548',
                            lon: '-74.00017656'
                        }), Venue.create({
                            name: 'Don\'s Bogam Korean BBQ & Wine',
                            address: '17 E 32nd St.',
                            lat: '40.74682007',
                            lon: '-73.98440615'
                        }), Venue.create({
                            name: 'Socarrat Paella Bar',
                            address: '259 W 19th St',
                            lat: '40.74264206',
                            lon: '-73.99965763'
                        }), Venue.create({
                            name: 'Amali',
                            address: '115 E 60th St',
                            lat: '40.76324834',
                            lon: '-73.96866312'
                        }), Venue.create({
                            name: 'Cibar',
                            address: '56 Irving Pl',
                            lat: '40.73608767',
                            lon: '-73.98721435'
                        }), Venue.create({
                            name: 'Moe\'s Southwest Grill',
                            address: '1029A Avenue of the Americas',
                            lat: '40.75267865',
                            lon: '-73.98578377'
                        }), Venue.create({
                            name: '310 Bowery Bar',
                            address: '310 Bowery',
                            lat: '40.72491738',
                            lon: '-73.99241589'
                        }), Venue.create({
                            name: 'Brother Jimmy\'s BBQ',
                            address: '116 E 16th St',
                            lat: '40.73559208',
                            lon: '-73.98869276'
                        }), Venue.create({
                            name: 'Grand Bar & Lounge',
                            address: '310 W Broadway',
                            lat: '40.72197115',
                            lon: '-74.00420015'
                        }), Venue.create({
                            name: 'The Library',
                            address: '7 Avenue A',
                            lat: '40.72243155',
                            lon: '-73.98623118'
                        }), Venue.create({
                            name: 'The Grayson',
                            address: '16 1st Ave',
                            lat: '40.72337515',
                            lon: '-73.98832271'
                        }), Venue.create({
                            name: 'El Rio Grande',
                            address: '160 E 38th St',
                            lat: '40.74824638',
                            lon: '-73.97666968'
                        }), Venue.create({
                            name: 'Paulaner on Bowery',
                            address: '265 Bowery',
                            lat: '40.72341',
                            lon: '-73.99246'
                        }), Venue.create({
                            name: 'City Winery',
                            address: '155 Varick St',
                            lat: '40.72635525',
                            lon: '-74.00576234'
                        }), Venue.create({
                            name: 'Iggy\'s Keltic Lounge',
                            address: '132 Ludlow St',
                            lat: '40.72021797',
                            lon: '-73.98825354'
                        }), Venue.create({
                            name: 'SoHo Park',
                            address: '62 Prince St',
                            lat: '40.72366867',
                            lon: '-73.99660136'
                        }), Venue.create({
                            name: '5 Napkin Burger',
                            address: '2315 Broadway',
                            lat: '40.78698695',
                            lon: '-73.9775478'
                        }), Venue.create({
                            name: 'P.J. Clarke\'s',
                            address: '220 Vesey St',
                            lat: '40.71348787',
                            lon: '-74.01614077'
                        }), Venue.create({
                            name: 'Lucky Jack\'s',
                            address: '129 Orchard St',
                            lat: '40.7196341',
                            lon: '-73.98954832'
                        }), Venue.create({
                            name: 'Kellari Taverna NY',
                            address: '19 W 44th St',
                            lat: '40.75543603',
                            lon: '-73.98130809'
                        }), Venue.create({
                            name: '5 Napkin Burger',
                            address: '150 E 14th St',
                            lat: '40.7332304',
                            lon: '-73.98759305'
                        }), Venue.create({
                            name: 'L\'Artusi',
                            address: '228 W 10th St',
                            lat: '40.73379361',
                            lon: '-74.00506581'
                        }), Venue.create({
                            name: 'Boulton & Watt',
                            address: '5 Avenue A',
                            lat: '40.72232356',
                            lon: '-73.98638039'
                        }), Venue.create({
                            name: 'Adrienne\'s Pizza Bar',
                            address: '54 Stone St',
                            lat: '40.70439773',
                            lon: '-74.01019595'
                        }), Venue.create({
                            name: 'Il Buco',
                            address: '47 Bond St',
                            lat: '40.72599774',
                            lon: '-73.99275409'
                        }), Venue.create({
                            name: 'Clinton Hall',
                            address: '90 Washington St',
                            lat: '40.70821932',
                            lon: '-74.01445976'
                        }), Venue.create({
                            name: 'Charlie Bird',
                            address: '5 King St',
                            lat: '40.72781164',
                            lon: '-74.00302649'
                        }), Venue.create({
                            name: 'Il Posto Accanto',
                            address: '190 E 2nd St',
                            lat: '40.72230066',
                            lon: '-73.98418849'
                        }), Venue.create({
                            name: 'Supper',
                            address: '156 E 2nd St',
                            lat: '40.72291487',
                            lon: '-73.98531854'
                        }), Venue.create({
                            name: 'La Compagnie des Vins Surnaturels',
                            address: '249 Centre St',
                            lat: '40.72044794',
                            lon: '-73.99796934'
                        }), Venue.create({
                            name: 'One & One',
                            address: '76 E 1st St',
                            lat: '40.72319636',
                            lon: '-73.98840626'
                        }), Venue.create({
                            name: 'The Ten Bells',
                            address: '247 Broome St',
                            lat: '40.71799099',
                            lon: '-73.98978213'
                        }), Venue.create({
                            name: 'Pianos',
                            address: '158 Ludlow St',
                            lat: '40.72111085',
                            lon: '-73.98786106'
                        }), Venue.create({
                            name: 'Empellón Al Pastor',
                            address: '132 Saint Marks Pl',
                            lat: '40.7267129',
                            lon: '-73.98322136'
                        }), Venue.create({
                            name: 'Mermaid Oyster Bar',
                            address: '79 Macdougal St',
                            lat: '40.72871577',
                            lon: '-74.00163991'
                        }), Venue.create({
                            name: 'Locanda Verde',
                            address: '377 Greenwich St',
                            lat: '40.72004087',
                            lon: '-74.01011561'
                        }), Venue.create({
                            name: 'The Quarter',
                            address: '522 Hudson St',
                            lat: '40.733888',
                            lon: '-74.006073'
                        }), Venue.create({
                            name: 'Solas',
                            address: '232 E 9th St',
                            lat: '40.72947025',
                            lon: '-73.98798466'
                        }), Venue.create({
                            name: 'Rare Bar & Grill',
                            address: '152 W 26th St',
                            lat: '40.74573796',
                            lon: '-73.99367458'
                        }), Venue.create({
                            name: 'Lure Fishbar',
                            address: '142 Mercer St',
                            lat: '40.72463457',
                            lon: '-73.99840236'
                        }),
                        Venue.create({
                            name: 'Pier A Harbor House',
                            address: '22 Battery Pl',
                            lat: '40.70433717',
                            lon: '-74.01840855'
                        }), Venue.create({
                            name: 'Yuca Bar & Restaurant',
                            address: '111 Avenue A',
                            lat: '40.72611538',
                            lon: '-73.98368876'
                        }), Venue.create({
                            name: 'Boots & Saddle',
                            address: '100A 7th Ave S',
                            lat: '40.7328334',
                            lon: '-74.00328755'
                        }), Venue.create({
                            name: 'City Vineyard at Pier 26',
                            address: '233 West St',
                            lat: '40.72119309',
                            lon: '-74.01292115'
                        }), Venue.create({
                            name: 'Gatsby\'s',
                            address: '53 Spring St',
                            lat: '40.72219625',
                            lon: '-73.99661858'
                        }), Venue.create({
                            name: 'Gyu-Kaku Japanese BBQ',
                            address: '34 Cooper Sq',
                            lat: '40.72829298',
                            lon: '-73.99119292'
                        }), Venue.create({
                            name: 'The Irish Exit',
                            address: '978 2nd Ave',
                            lat: '40.75597495',
                            lon: '-73.96771037'
                        }), Venue.create({
                            name: 'Lucy\'s Cantina Royale',
                            address: '1 Penn Plaza',
                            lat: '40.75171103',
                            lon: '-73.99309158'
                        }), Venue.create({
                            name: 'Hair of the Dog',
                            address: '168 Orchard St',
                            lat: '40.72135669',
                            lon: '-73.98859565'
                        }), Venue.create({
                            name: 'Toshi\'s Living Room',
                            address: '1141 Broadway',
                            lat: '40.74395753',
                            lon: '-73.98912093'
                        }), Venue.create({
                            name: 'Coyote Ugly Saloon',
                            address: '153 1st Ave',
                            lat: '40.72861927',
                            lon: '-73.98464145'
                        }), Venue.create({
                            name: 'Food Emporium Illy Cafe',
                            address: '1175 3rd Ave',
                            lat: '40.76771962',
                            lon: '-73.96206119'
                        }), Venue.create({
                            name: 'Il Bastardo',
                            address: '191 7th Ave',
                            lat: '40.743042',
                            lon: '-73.996272'
                        }), Venue.create({
                            name: 'Treadwell Downtown',
                            address: '301 S End Ave',
                            lat: '40.71026027',
                            lon: '-74.01659925'
                        }), Venue.create({
                            name: 'Cucina Di Pesce',
                            address: '87 E 4th St',
                            lat: '40.72635334',
                            lon: '-73.98981993'
                        }), Venue.create({
                            name: 'Percy\'s BBQ & Darts',
                            address: '210 Avenue A',
                            lat: '40.72979886',
                            lon: '-73.98079444'
                        }), Venue.create({
                            name: 'Rosie O\'Grady\'s',
                            address: '800 7th Ave',
                            lat: '40.76254422',
                            lon: '-73.9824312'
                        }), Venue.create({
                            name: 'M1-5 Lounge',
                            address: '52 Walker St',
                            lat: '40.71907342',
                            lon: '-74.00346477'
                        }), Venue.create({
                            name: 'Red Lobster',
                            address: '261 W 125Th Street',
                            lat: '40.810073',
                            lon: '-73.950483'
                        }), Venue.create({
                            name: 'Tavern On Third',
                            address: '380 3rd Ave',
                            lat: '40.7416691',
                            lon: '-73.9812324'
                        }), Venue.create({
                            name: 'FADER FORT',
                            address: '38 Delancey St',
                            lat: '40.7198035',
                            lon: '-73.991994'
                        }), Venue.create({
                            name: 'The NoMad Hotel',
                            address: '1170 Broadway',
                            lat: '40.74502982',
                            lon: '-73.98850501'
                        }), Venue.create({
                            name: 'Sake Bar Decibel',
                            address: '240 E 9th St',
                            lat: '40.72941824',
                            lon: '-73.98776924'
                        }), Venue.create({
                            name: 'Izakaya MEW',
                            address: '53 W 35th St',
                            lat: '40.75014508',
                            lon: '-73.98639034'
                        }), Venue.create({
                            name: 'Milk & Hops Chelsea',
                            address: '166 9th Ave',
                            lat: '40.74475131',
                            lon: '-74.00259535'
                        }), Venue.create({
                            name: 'The Press Lounge',
                            address: '653 11th Ave',
                            lat: '40.76455535',
                            lon: '-73.99589549'
                        }), Venue.create({
                            name: 'Bathtub Gin',
                            address: '132 9th Ave',
                            lat: '40.74359106',
                            lon: '-74.00335'
                        }), Venue.create({
                            name: 'Shorty\'s',
                            address: '576 9th Ave',
                            lat: '40.75823135',
                            lon: '-73.99280801'
                        }), Venue.create({
                            name: 'Gramercy Park Hotel',
                            address: '2 Lexington Ave',
                            lat: '40.73850985',
                            lon: '-73.98565153'
                        }), Venue.create({
                            name: 'Dream Downtown',
                            address: '355 W 16th St',
                            lat: '40.74203423',
                            lon: '-74.0036484'
                        }), Venue.create({
                            name: 'Gansevoort Meatpacking NYC',
                            address: '18 9th Ave',
                            lat: '40.73996725',
                            lon: '-74.0057946'
                        }), Venue.create({
                            name: 'Rise',
                            address: '859 9th Ave',
                            lat: '40.76713677',
                            lon: '-73.98633634'
                        }), Venue.create({
                            name: 'The Peoples Improv Theater',
                            address: '123 E 24th St',
                            lat: '40.74044086',
                            lon: '-73.98478411'
                        }), Venue.create({
                            name: 'Union Fare',
                            address: '5 E 17th St',
                            lat: '40.7376175',
                            lon: '-73.99160162'
                        }), Venue.create({
                            name: 'Soju Haus',
                            address: '315 5th Ave Fl 2',
                            lat: '40.74717931',
                            lon: '-73.98531625'
                        }), Venue.create({
                            name: 'The Eagle',
                            address: '554 W 28th St',
                            lat: '40.7518432',
                            lon: '-74.00421474'
                        }), Venue.create({
                            name: 'Therapy NYC',
                            address: '348 W 52nd St',
                            lat: '40.76405678',
                            lon: '-73.98687395'
                        }), Venue.create({
                            name: 'Salvation Taco',
                            address: '145 E 39th St',
                            lat: '40.74941658',
                            lon: '-73.97665246'
                        }), Venue.create({
                            name: 'Lupulo',
                            address: '835 Avenue of the Americas',
                            lat: '40.74673774',
                            lon: '-73.99012585'
                        }), Venue.create({
                            name: 'Bell Book & Candle',
                            address: '141 W 10th St',
                            lat: '40.73463',
                            lon: '-74.00082633'
                        }), Venue.create({
                            name: 'Lucky Strike New York',
                            address: '624-660 W 42nd St',
                            lat: '40.76177416',
                            lon: '-74.00086519'
                        }), Venue.create({
                            name: 'Flaming Saddles Saloon',
                            address: '793 9th Ave',
                            lat: '40.76516262',
                            lon: '-73.9876315'
                        }), Venue.create({
                            name: 'Industry Bar',
                            address: '355 W 52nd St',
                            lat: '40.76421263',
                            lon: '-73.98701743'
                        }), Venue.create({
                            name: 'Pergola',
                            address: '36 W 28th St',
                            lat: '40.74564505',
                            lon: '-73.98946826'
                        }), Venue.create({
                            name: 'Ritz Bar & Lounge',
                            address: '369 W 46th St',
                            lat: '40.760871',
                            lon: '-73.990166'
                        }), Venue.create({
                            name: 'Marie\'s Crisis Cafe',
                            address: '59 Grove St',
                            lat: '40.73305811',
                            lon: '-74.00320653'
                        }), Venue.create({
                            name: 'Sake Bar Satsko',
                            address: '202 E 7th St',
                            lat: '40.72464723',
                            lon: '-73.98018977'
                        }), Venue.create({
                            name: 'The Blind Tiger',
                            address: '281 Bleecker St',
                            lat: '40.73185407',
                            lon: '-74.00335'
                        }), Venue.create({
                            name: 'The Blind Barber',
                            address: '339 E 10th St',
                            lat: '40.72705648',
                            lon: '-73.98041169'
                        }), Venue.create({
                            name: 'The Duplex',
                            address: '61 Christopher St',
                            lat: '40.73373059',
                            lon: '-74.00265563'
                        }), Venue.create({
                            name: 'Soho Grand Hotel',
                            address: '310 W Broadway',
                            lat: '40.72195527',
                            lon: '-74.00437719'
                        }), Venue.create({
                            name: 'Ty\'s Bar',
                            address: '114 Christopher St',
                            lat: '40.73323592',
                            lon: '-74.00540917'
                        }), Venue.create({
                            name: 'Dream Midtown',
                            address: '210 W 55th St',
                            lat: '40.76461816',
                            lon: '-73.98198037'
                        }), Venue.create({
                            name: 'The Odeon',
                            address: '145 W Broadway',
                            lat: '40.71700359',
                            lon: '-74.00810145'
                        }), Venue.create({
                            name: 'Taj II Lounge',
                            address: '48 W 21st St',
                            lat: '40.74123488',
                            lon: '-73.99298592'
                        }), Venue.create({
                            name: 'Karma',
                            address: '51 1st Ave',
                            lat: '40.72481469',
                            lon: '-73.98732654'
                        })
                    ]);
                })
                .then((venues) => {

                    for (var i = 0; i < venues.length; i++) {
                        let shuffleGenres = shuffle(genres);
                        venues[i].setGenres([shuffleGenres[0]]);
                    }
                });
        });
};

seed()
    .then(() => {
        console.log('seeded');
    });
