import { Room } from '../model/exhibit';

const blueRoom: Room = {
    name: 'WWI and the Interwar Years',
    color: 'blue',
    audio: 'blue-room.mp3',
    description: [
        'This section depicts the early days of aviation and initial bombing capabilities of a variety of air forces.  ' +
        'Small aircraft generally performed reconnaissance missions in support of ground commanders who understood ' +
        'that aerial observation of their ground deployments and posture could compromise operations.  From this was ' +
        'born fighter aircraft, whose duty it was to prevent other aircraft from observing and reporting on troop dispositions.'
    ],
    artifacts: [
        {
            number: '1.1.1',
            roomColor: 'blue',
            name: 'Jarvis Offutt',
            pictures: [
                'Offutt'
            ],
            audio: 'blue-artifact-5.mp3',
            description: [
                'In 1916, Jarvis Offutt was one of 300 candidates sent from the United States to Canada to be trained by the ' +
                'Royal Flying Corps Canada.  Upon pilot qualification, he was sent to Fort Worth, Texas where he received his ' +
                'commission as a First Lieutenant in the Aviation Section of the U.S. Signal Corps in November 1916.  He was ' +
                'assigned to the 22nd Aero Squadron and after additional training boarded transport L501 (the S.S. Adriatic) on ' +
                'January 31, 1918 with the Squadron bound for Liverpool, England.  Upon arrival, the Squadron continued ' +
                'training, after which he was assigned duties as a ferry pilot attached to the Royal Flying Corps.  As a ' +
                'ferry pilot, his duties were to deliver aircraft from factories in England to bases at the front in France.',
                'Offutt died on August 13, 1918 from injuries received while flying at Valheureux, France.  It is unknown whether ' +
                'his death resulted from enemy action or from an aircraft accident.  On January 13, 1948, Fort Crook (near Omaha, NE) ' +
                'was renamed to Offutt Air Force Base, the future home of the headquarters of Strategic Air Command.'
            ]
        },
        {
            number: '1.1.2',
            roomColor: 'blue',
            name: 'Jarvis Offutt Scrapbook',
            pictures: [
                'MusicalClubs'
            ],
            audio: 'blue-artifact-4.mp3',
            description: [
                'This scrapbook is a collection of photos and documents from Jarvis Offutt’s personal life. This includes his ' +
                'time at Lawrenceville Preparatory School, New Jersey, from which he graduated in 1913. The scrapbook contains ' +
                'various articles, including a letter to his mother from Howard Roewood about Jarvis’ skills as a mandolin player.'
            ]
        },
        {
            number: '1.1.3',
            roomColor: 'blue',
            name: 'Martin MB-1',
            pictures: [
                'MartinMB-1',
            ],
            audio: 'blue-artifact-1.mp3',
            description: [
                'Designed by the Glenn Martin Company, the Martin MB-1 was the first American designed heavy bomber ' +
                'purchased in mass quantities and became the main United States Army Air Service bomber for several years.  ' +
                'The bomber was powered with two Liberty 12-A engines with 400 horsepower each and operated with a crew ' +
                'of three to four members. Weaponry consisted of five 7.62mm machine guns and an offensive load of ' +
                '2,000 lbs of bombs.'
            ]
        },
        {
            number: '1.1.4',
            roomColor: 'blue',
            name: 'De Havilland DH.4',
            pictures: [
                'DeHavilland',
            ],
            audio: 'blue-artifact-1.mp3',
            description: [
                'The De Havilland DH.4 was one of the most successful fighter aircraft of WW1, with over 6,000 units built by war’s ' +
                'end. It carried a crew of two with the pilot seated ahead of the gunner/observer. There was quite a bit of ' +
                'separation between the two and a “speaking tube” was installed, but this did little to improve the already ' +
                'hindered communication. The pilot had one or two forward facing machine guns, while the rear seat was fitted ' +
                'with two more machine guns on a ring mounting. First accepted by the US in 1917, several variants were ' +
                'developed including reconnaissance aircraft, trainers, and long-range aircraft. The final US Army variant, the ' +
                'DH.4, was retired in 1932.'
            ]
        },
        {
            number: '1.1.5',
            roomColor: 'blue',
            name: 'Vajen Bader Smoke Helmet',
            pictures: [
                'Mask'
            ],
            audio: 'blue-artifact-3.mp3',
            background: '#f6f5f1',
            description: [
                'The Vajen Bader Smoke Helmet was invented in the 1890s by Willis Vajen and William Bader.  The Smoke Helmet ' +
                'was advertised as a safeguard against smoke, gases and chemicals.  It is made of chamois leather and is ' +
                'heavily padded with fleece, which acts as a pressure stop against outside air trying to enter the helmet.  A ' +
                'compact compression tank, attached to the back of the helmet, feeds air into the helmet at atmospheric ' +
                'pressure, where the temperature is always 20 degrees lower than the surrounding atmosphere.  The eye and ' +
                'diaphragms at the ear holes are made of mica, which allow clear eyesight and perfect transmission of sound.'
            ]
        },
        {
            number: '1.1.6',
            roomColor: 'blue',
            name: 'Arisaka Type 99 Bolt Action Rifle',
            pictures: [
                'Rifle'
            ],
            audio: 'blue-artifact-6.mp3',
            description: [
                'Although the Type 99 didn’t appear until 1939, it is on display as a representative of the Arisaka rifles used by ' +
                'the growing Japanese empire in the early 1930s.  The Type 38 Arisaka, used during the Sino-Japanese war of ' +
                'the 1930s, was outdated compared to the Chinese rifles.  While the Type 38 used a ' +
                '6.5mm cartridge, the Chinese were using the far superior 7.9mm, which gave the Chinese a large advantage in ' +
                'range.  The Type 99 was chambered to fire a 7.7-58mm cartridge, allowing it to compete with other short ' +
                'rifles.  It was also designed as an affordable, easier to produce rifle, which proved vital for Japan towards the ' +
                'end of WW2.  However, production was not at full speed at the start of the war so Japan was forced to continue ' +
                'to use of the Type 38.'
            ]
        },
        {
            number: '1.1.7',
            roomColor: 'blue',
            name: 'Japanese "Good Luck" Flag',
            pictures: [
                'Flag'
            ],
            audio: 'blue-artifact-2.mp3',
            description: [
                'Known as yosegaki hinomaru, “good luck” flags were parting gifts for soldiers deployed overseas and typically carried in ' +
                'their pockets.  The Japanese National flag, or hinomaru, was the common medium for messages, prayers, ' +
                'and well-wishes from family and friends.  This gathering of writings, known as yosegaki, was often inscribed in ' +
                'a pattern radiating from the center of the flag.  Japanese soldiers carried these as a reminder of home to ' +
                'endure difficult conditions while deployed across the Empire.'
            ]
        }
    ]
};

export default blueRoom;
