import { Room } from '../model/exhibit';

const yellowRoom: Room = {
    name: 'America Enters the War',
    color: 'yellow',
    audio: 'yellow-room.mp3',
    description: [
        'Japan was expanding its influence in the Pacific Region, China, and Korea; then identified ' +
        'potential concerns with the United States as a competitor for regional resources.',
        'America’s isolation from war ended December 7, 1941, when Japan staged a devastating ' +
        'surprise attack at Pearl Harbor, Hawaii, where much of the Pacific Fleet was moored. Japanese ' +
        'warplanes sank or damaged 18 warships and destroyed 162 aircraft. Over 2,400 servicemen ' +
        'and civilians lost their lives. President Franklin D. Roosevelt responded with a statement of ' +
        'American will: “No matter how long it may take us to overcome this premeditated invasion, the ' +
        'American people in their righteous might will win through to absolute victory.” ' +
        'Though stunned by the events of December 7, Americans were also resolute. On December 8, ' +
        'president Roosevelt asked Congress to pass a resolution declaring war on Japan. The ' +
        'declaration passed with only a single dissent. Germany, Italy, and France declared war on the ' +
        'United States three days later. America was now drawn into a global war. The United States ' +
        'joined allies in the fight including Great Britain and the Soviet Union. '
    ],
    artifacts: [
        {
            number: '1.3.1',
            roomColor: 'yellow',
            name: 'Akagi Aircraft Carrier',
            pictures: [
                '1.3.1'
            ],
            audio: '1.3.1.mp3',
            description: [
                'The aircraft carrier dramatically changed naval combat in World War II, because air power was ' +
                'becoming a significant factor in warfare. The advent of aircraft as focal weapons was driven by ' +
                'their superior range, flexibility, and effectiveness when launched from carriers. They also had ' +
                'greater range and precision than naval guns, making them highly effective for bombardment.'
            ]
        },
        {
            number: '1.3.2',
            roomColor: 'yellow',
            name: 'Philco Radio',
            pictures: [
                '1.3.2'
            ],
            audio: '1.3.2.mp3',
            description: [
                'Before television, radio served as the primary form of mass communication, with families ' +
                'gathering around the radio for the day’s entertainment, music and news broadcasts. Perhaps ' +
                'the most famous dramatic radio broadcast was the October 30, 1938 broadcast of the ' +
                'documentary style retelling of HG Wells’ novel War of the Worlds by Orson Welles. The majority ' +
                'of listeners tuned in shortly after the broadcast started and were greeted by serious warnings of ' +
                'aliens and burning towns, which led to some minor moments of hysteria.'
            ]
        }
    ]
};

export default yellowRoom;
