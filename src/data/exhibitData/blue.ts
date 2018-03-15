import { Exhibit } from '../model/exhibit';

const blueExhibit: Exhibit = {
    name: 'WWI and the Interwar Years',
    color: 'blue',
    artifacts: [
        {
            number: '1.1.1',
            name: 'Jarvis Offutt',
            description: 'Jarvis Offutt is the Namesake of Offutt Air Force Base in Bellevue, Nebraska (Formerly Fort Crook and Offutt Field.)\n\n' +
            'Offutt was born in Omaha, Nebraska on October 26, 1894, attended Omaha Central High School, and graduated from the Lawrenceville ' +
            'Preparatory School in 1913. He earned a degree from Yale University in 1917; while at Yale, he was a member of the Varsity Club, Glee ' +
            'Club, Alpha Delta Phi fraternity; and was a track and field man, winning honors in the high hurdles. He was also inducted into the Phi ' +
            'Beta Kappa Society, an organization which recognizes high academic achievement. In 1916, Jarvis was one of 300 candidates sent from the ' +
            'United States to Canada to be trained by the Royal Flying Corps Canada. Upon pilot qualification he was sent to Fort Worth, Texas where ' +
            'he received his commission as a First Lieutenant in the Aviation Section, U.S. Signal Corps in November 1916. He was assigned to the ' +
            '22nd Aero Squadron and after more training boarded transport L501 (the S.S. Adriatic) on 31 January 1918 with the Squadron bound ' +
            'forLiverpool, England. Upon arrival the Squadron continued further training, after which he was assigned duties as a ferry pilot attached' +
            ' to the Royal FlyingCorps. As a ferry pilot, his duties were to deliver aircraft from factories in England to bases at the front in France. ' +
            'In the course of these duties, he crossed the English Channel almost daily.\n\n' +
            'Offutt died on August 13, 1918 from injuries received while flying at Valheureux, France. It is unknown whether his death resulted from ' +
            'enemy action or from an aircraft accident. On May 10, 1924 the landing field at Fort Crook, near Omaha, Nebraska, was renamed Offutt ' +
            'Field in his honor. The dedication ceremony, attended by Offutt\'s mother and brother, featured an aerial salute from 19 planes which ' +
            'circled the field; then-Major (United States) CharlesTinker commanded seven of the planes which flew from Fort Riley, Kansas and dropped ' +
            'a dedicatory wreath to highlight the ceremony.\n\n' +
            'On January 13, 1948 both the airfield and Fort Crook were renamed Offutt Air Force Base, ' +
            'the home of the headquarters of Strategic Air Command.',
            pictures: [
                'Offutt'
            ],
            audio: 'blue-artifact-5.mp3'
        },
        {
            number: '1.1.2',
            name: 'Jarvis Offutt Scrapbook',
            description: 'This scrapbook is a collection of photos and documents from Jarvis Offutt’s personal life.  This includes his time at Lawrenceville' +
            ' Preparatory School, New Jersey, from where he graduated in 1913.  The Scrapbook is open to various articles from his time at Lawrenceville ' +
            'including a letter to his mother from Howard Roewood about Jarvis’ skills as a mandolin player.  He also attended Yale University where he ' +
            'was a member of the Varsity Club, Glee Club, Alpha Delta Phi fraternity and a track star winning honors in the high hurdles.  His high academic ' +
            'achievements were also recognized with his induction into the Phi Beta Kappa Society.  ',
            pictures: [
                'MusicalClubs'
            ],
            audio: 'blue-artifact-4.mp3'
        },
        {
            number: '1.1.3',
            name: 'Martin MB-1',
            description: 'Designed by the Glenn Martin Company, the Martin MB-1 was the first American designed heavy bomber purchased in mass and became the ' +
            'main United States Army Air Service bomber for some time.  The bomber was powered with two Liberty 12-A engines with 400 horsepower each with a crew ' +
            'of three to four crew members.  Weaponry consisted of 5 x 7.62mm machine guns and an offensive load of 2,000lbs of bombs.   The MB-1, despite its ' +
            'offensive capabilities, was to serve a primary role as a reconnaissance aircraft.  It would later be replaced with an enhanced model aircraft known ' +
            'as the MB-2.  There were other MB-1 variants tested out and worth mentioning which demonstrate what it\'s designers were envisioning for the future ' +
            'of large aircraft.  One MB-1 was designed to carry a 37mm cannon that replaced the bow-mount machine gun position.  Another sported a third engine, ' +
            'a Hispano-Suiza, in the nose.  The Glen Martin Passenger variant had room for ten passengers while another model, the T-1, served as mail carrier plane.',
            pictures: [
                'DeHavilland',
            ],
            audio: 'blue-artifact-1.mp3'
        },
        {
            number: '1.1.4',
            name: 'De Havilland DH.4',
            description: 'One of the most successful fighter aircraft of WW1, over 6,000 units were built by war’s end.  It carried a crew of two with the pilot ' +
            'seated ahead of the gunner/observer.  There was quite a bit of separation between the two and a “speaking tube” was installed but this did little to ' +
            'improve the already hindered communication.  The pilot had one or two forward facing machine guns, while the rear seat was fitted with two more machine ' +
            'guns on a ring mounting.  First accepted by the US in 1917 several variants developed including reconnaissance aircraft, trainers, longe-range aircraft.  ' +
            'The final US Army variant, the DH.4, was retired in 1932.',
            pictures: [
                'DeHavilland',
            ],
            audio: 'blue-artifact-1.mp3'
        },
        {
            number: '1.1.5',
            name: 'Vajen Bader Smoke Helmet',
            description: 'Invented in the 1890s by Willis Vajen and William Bader, the Vajen Bader Smoke Helmet was advertised as a safeguard against smoke, gases and ' +
            'chemicals.  The helmet is made of chamois leather and heavily padded with fleece which acts as a pressure stop against outside air trying to enter the ' +
            'helmet.  A compact compression tank, attached to the back of the helmet, feeds air into the helmet at atmospheric pressure where the temperature is always ' +
            '20 degrees lower than the surrounding atmosphere.  The eye and diaphragms, at the ear holes, are made of mica which allow clear eyesight and perfect ' +
            'transmission of sound.   The air pressurization technology took Vajen and Bader ten years to perfect and made the helmet a commercial success in mining ' +
            'as well as firefighting.  Unbeknownst to the inventors, the technology they perfected would be applied in the future to high altitude bombers during WW2.',
            pictures: [
                'Mask'
            ],
            audio: 'blue-artifact-3.mp3',
            background: '#f6f5f1'
        },
        {
            number: '1.1.6',
            name: 'Arisaka type 99 Bolt Action Rifle',
            description: 'Although the type 99 didn’t appear until 1939, it is on display as a representative of the Arisaka rifles used by the growing Japanese empire ' +
            'in the early 1930s.  The type 38 Arisaka, used during the Sino-Japanese war of the 1930s, turned out to be outdated when compared to the Chinese rifles.  ' +
            'While the type 38 was using the 6.5mm cartridge, the Chinese were using the far superior 7.9mm which gave the Chinese an advantage at range.  The Type 99 ' +
            'was chambered to fire a 7.7x58mm cartridge allowing it to compete with other short rifles.  It was also designed as an affordable, easier-to-produce rifle ' +
            'which proved vital for Japan towards the end of WW2.  However, production was not a full speed at the start of the war so Japan was forced to continue use ' +
            'of the Type 38.',
            pictures: [
                'Rifle'
            ],
            audio: 'blue-artifact-6.mp3'
        },
        {
            number: '1.1.7',
            name: 'Japanese "Good Luck" Flag',
            description: 'Known as yosegaki hinomaru, "good luck" flags were parting gifts for soldiers deployed overseas and carried in their pockets.  The Japanese ' +
            'National flag, or hinomaru, was the common medium for which messages and prayers and well-fishes from family and friends.  This gathering of writings, ' +
            'known as yosegaki, was often inscribed in a pattern radiating from the center of the flag.  Japanese soldiers carried these as a reminder of home to endure ' +
            'difficult conditions while deployed across the Empire.',
            pictures: [
                'Flag'
            ],
            audio: 'blue-artifact-2.mp3'
        }
    ]
};

export default blueExhibit;
