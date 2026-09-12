// Initial seed data for Church Sanctuary
import {
  AnnouncementEntity,
  Devotional,
  JoinedGroupEntity,
  JournalEntity,
  PastorEntity,
  PastorMessageEntity,
  Sermon,
  SermonEntity,
  StaffAccount,
} from '../types';

export const STAFF_ACCOUNTS: StaffAccount[] = [
  {
    name: 'Rev. Dr. Thomas Wright',
    role: 'Senior Pastor',
    presetPasscode: '1001',
    avatarInitials: 'TW',
    avatarColor: 'bg-blue-700 text-white',
  },
  {
    name: 'Pastor Sarah Jenkins',
    role: 'Associate & Family Pastor',
    presetPasscode: '2002',
    avatarInitials: 'SJ',
    avatarColor: 'bg-emerald-700 text-white',
  },
  {
    name: 'David Miller',
    role: 'Worship & Creative Arts Director',
    presetPasscode: '3003',
    avatarInitials: 'DM',
    avatarColor: 'bg-amber-700 text-white',
  },
  {
    name: 'Hannah Kim',
    role: 'Youth & Outreach Pastor',
    presetPasscode: '4004',
    avatarInitials: 'HK',
    avatarColor: 'bg-purple-700 text-white',
  },
];

export const INITIAL_ANNOUNCEMENTS: AnnouncementEntity[] = [
  {
    id: 'ann-1',
    title: 'Sunday Worship: The Power of Steadfast Faith',
    content:
      'Join us this Sunday at 9:00 AM and 11:15 AM as Senior Pastor Wright kicks off our sermon series through Romans. Nursery and children\'s ministry are fully staffed during both services. Coffee and community fellowship in the atrium between gatherings.',
    authorName: 'Rev. Dr. Thomas Wright',
    scriptureRef: 'Romans 8:31-39',
    ctaLabel: 'Plan Your Visit',
    ctaLink: '#visit',
    category: 'Worship',
    isPinned: true,
    isScheduled: false,
    publishedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    isBroadcastSent: true,
  },
  {
    id: 'ann-2',
    title: 'Annual Community Food Drive & Outreach Day',
    content:
      'We are partnering with the local downtown shelter to prepare 500 family grocery boxes and warm winter supplies. Volunteers will meet at the Family Life Center this Saturday at 8:30 AM for a short prayer sendoff before distribution.',
    authorName: 'Hannah Kim',
    scriptureRef: 'Matthew 25:35-40',
    ctaLabel: 'Sign Up to Volunteer',
    ctaLink: '#volunteer',
    category: 'Outreach',
    isPinned: true,
    isScheduled: false,
    publishedAt: new Date(Date.now() - 7 * 3600 * 1000).toISOString(),
    isBroadcastSent: true,
  },
  {
    id: 'ann-3',
    title: 'Night of Acoustic Praise & Communion',
    content:
      'An intimate evening of sacred hymns, acoustic worship, and guided communion led by David Miller and our Sanctuary choir. Doors open at 6:45 PM for quiet reflection and personal prayer in the sanctuary.',
    authorName: 'David Miller',
    scriptureRef: 'Psalm 100:1-5',
    ctaLabel: 'Add to Calendar',
    ctaLink: '#calendar',
    category: 'Worship',
    isPinned: false,
    isScheduled: false,
    publishedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    isBroadcastSent: false,
  },
  {
    id: 'ann-4',
    title: 'Family & Marriage Weekend Retreat',
    content:
      'Registration is officially open for our autumn couples and parenting weekend at Pinecrest Haven Retreat Center. Deepen marital bonds, enjoy guided workshops, and experience renewed vision for your home. Early registration discounts apply this week.',
    authorName: 'Pastor Sarah Jenkins',
    scriptureRef: 'Colossians 3:12-14',
    ctaLabel: 'Register Family',
    ctaLink: '#retreat',
    category: 'Community',
    isPinned: false,
    isScheduled: false,
    publishedAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    isBroadcastSent: false,
  },
  {
    id: 'ann-5',
    title: 'Youth Summer Mission Trip Informational Lunch',
    content:
      'All high school students (grades 9-12) and their parents are invited to a brief informational lunch immediately following the 11:15 AM service in Room 204. We will review trip dates, service projects, and fundraising timelines.',
    authorName: 'Hannah Kim',
    scriptureRef: '1 Timothy 4:12',
    ctaLabel: 'View Trip Overview',
    ctaLink: '#youth',
    category: 'Youth',
    isPinned: false,
    isScheduled: false,
    publishedAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
    isBroadcastSent: false,
  },
];

export const INITIAL_PRAYER_GROUPS: JoinedGroupEntity[] = [
  {
    id: 'grp-1',
    groupName: 'Grace Sanctuary Men\'s Fellowship',
    category: "Men's",
    meetingTime: 'Tuesdays at 6:30 AM (Room 102 & Zoom)',
    joinedAt: new Date(Date.now() - 14 * 86400 * 1000).toISOString(),
    rsvpStatus: 'attending',
    reminderEnabled: true,
  },
  {
    id: 'grp-2',
    groupName: 'Sisters in Christ Prayer Circle',
    category: "Women's",
    meetingTime: 'Wednesdays at 7:00 PM (Sanctuary Chapel)',
    joinedAt: new Date(Date.now() - 7 * 86400 * 1000).toISOString(),
    rsvpStatus: 'interested',
    reminderEnabled: true,
  },
  {
    id: 'grp-3',
    groupName: 'Ignite Youth & Young Adults',
    category: 'Youth',
    meetingTime: 'Fridays at 6:30 PM (Youth Loft)',
    joinedAt: new Date(Date.now() - 3 * 86400 * 1000).toISOString(),
    rsvpStatus: 'none',
    reminderEnabled: false,
  },
  {
    id: 'grp-4',
    groupName: 'Hope City Compassion & Homeless Outreach',
    category: 'Outreach',
    meetingTime: 'Saturdays at 9:00 AM (Atrium)',
    joinedAt: new Date(Date.now() - 2 * 86400 * 1000).toISOString(),
    rsvpStatus: 'none',
    reminderEnabled: false,
  },
  {
    id: 'grp-5',
    groupName: 'Intercessory Prayer & Worship Team',
    category: 'Worship',
    meetingTime: 'Thursdays at 6:00 PM (Sanctuary Altar)',
    joinedAt: new Date(Date.now() - 21 * 86400 * 1000).toISOString(),
    rsvpStatus: 'attending',
    reminderEnabled: true,
  },
];

export const SAMPLE_DEVOTIONALS: Devotional[] = [
  {
    date: 'Today',
    title: 'The Lord is My Shepherd: Rest in His Care',
    morningReflection:
      'David writes not as a detached philosopher, but as an experienced shepherd who intimately understood the vulnerabilities of sheep. When he proclaims "The Lord is my shepherd; I shall not want," he testifies to a God whose providence anticipates every hunger, every exhaustion, and every hidden cliff before we even whisper our request.',
    eveningReflection:
      'As evening shadows lengthen, examine the pastures where your heart wandered today. Did you consume anxious headlines and unresolved fears, or did you rest beside the quiet waters of His promises? Cast every care upon Him, knowing the Shepherd never slumbers nor sleeps.',
    scriptureRefs: ['Psalms 23:1', 'Psalms 23:2', 'John 1:4'],
    questions: [
      'In which specific area of your life are you struggling to trust God\'s provision today?',
      'What does "lying down in green pastures" look like for your spiritual rhythm this evening?',
    ],
    closingPrayer:
      'Heavenly Father, thank You for being my vigilant Shepherd. Lead me along righteous paths for Your name\'s sake. Quiet my restless worries, forgive my wandering heart, and grant me restful sleep wrapped in Your unshakable presence. In Christ\'s holy name, Amen.',
    audioDurationSec: 280, // ~4:40
  },
  {
    date: 'Yesterday',
    title: 'More Than Conquerors Through Christ',
    morningReflection:
      'Paul reminds the church in Rome that in all things—tribulation, distress, persecution, famine, or peril—we are more than conquerors through Him who loved us. Our victory does not mean the absence of difficulty, but the guaranteed triumph of divine love in the midst of it.',
    eveningReflection:
      'Reflect upon the moments today where you felt small, weary, or discouraged. Christ has already conquered the world; your eternal security is sealed in His finished work on the Cross.',
    scriptureRefs: ['Romans 8:31', 'Romans 8:37', 'Romans 8:39'],
    questions: [
      'What challenge today made you feel like you were walking alone?',
      'How does knowing nothing can separate you from God\'s love reshape your hope for tomorrow?',
    ],
    closingPrayer:
      'Lord Jesus, You conquered death and sin. Anchor my spirit today in Your eternal victory, that I may walk with boldness and extend Your forgiving grace to everyone I encounter. Amen.',
    audioDurationSec: 315,
  },
  {
    date: 'Wednesday',
    title: 'The Word Made Flesh and Dwelling Among Us',
    morningReflection:
      'John opens his gospel with awe-inspiring majesty: "In the beginning was the Word, and the Word was with God, and the Word was God." In Jesus Christ, the infinite Creator entered human frailty to bring illumination and life into our darkest hours.',
    eveningReflection:
      'The darkness of this broken world has never overcome the true Light. Whatever shadow you face tonight, remember that the Light of Christ shines undiminished in your soul.',
    scriptureRefs: ['John 1:1', 'John 1:5', 'Philippians 4:7'],
    questions: [
      'Where do you need the illuminating light of Christ to break through in your circumstances?',
      'How can you be a conduit of Christ\'s light to a neighbor or family member?',
    ],
    closingPrayer:
      'Lord God, thank You for sending Your Son as the living Word. Let Your truth dwell richly in my heart, dispelling every shadow of doubt and guiding my steps in peace. Amen.',
    audioDurationSec: 295,
  },
];

export const SAMPLE_SERMONS: Sermon[] = [
  {
    id: 'sermon-1',
    title: 'Anchored in Unshakable Grace',
    speaker: 'Rev. Dr. Thomas Wright',
    series: 'Romans: The Heart of the Gospel',
    category: 'Grace',
    durationSec: 2145, // 35:45
    scriptureRef: 'Romans 8:28-39',
    description:
      'Exploring Paul\'s climactic anthem in Romans 8: why God\'s electing love guarantees that neither suffering nor spiritual warfare can sever the believer from divine fellowship.',
  },
  {
    id: 'sermon-2',
    title: 'Walking Through the Valley Without Fear',
    speaker: 'Rev. Dr. Thomas Wright',
    series: 'Psalms of Solace',
    category: 'Faith',
    durationSec: 1860, // 31:00
    scriptureRef: 'Psalms 23:1-6',
    description:
      'A deeply comforting verse-by-verse meditation through Psalm 23, revealing how God\'s rod and staff provide both boundary and protection in seasons of grief.',
  },
  {
    id: 'sermon-3',
    title: 'Cultivating a Peaceful Home in a Chaotic Age',
    speaker: 'Pastor Sarah Jenkins',
    series: 'Flourishing Families',
    category: 'Family',
    durationSec: 1720, // 28:40
    scriptureRef: 'Colossians 3:12-17',
    description:
      'Practical biblical wisdom for parents, spouses, and households: putting on compassionate hearts, kindness, humility, and patience as bonds of perfect harmony.',
  },
  {
    id: 'sermon-4',
    title: 'Praise as a Weapon of Victory',
    speaker: 'David Miller',
    series: 'The Heart of the Worshipper',
    category: 'Worship',
    durationSec: 1540, // 25:40
    scriptureRef: 'Psalm 100:1-5',
    description:
      'How biblical thanksgiving and vocal praise alter spiritual atmosphere, dismantle anxiety, and usher in God\'s presence during spiritual warfare.',
  },
  {
    id: 'sermon-5',
    title: 'Courage to Stand in the Day of Battle',
    speaker: 'Hannah Kim',
    series: 'Unashamed Generation',
    category: 'Youth',
    durationSec: 1980, // 33:00
    scriptureRef: '1 Corinthians 13:1-13',
    description:
      'Challenging students and young adults to ground their identity in Christ\'s unyielding love and stand firm with integrity against cultural compromise.',
  },
];

export const INITIAL_PASTOR_CHAT: PastorMessageEntity[] = [
  {
    id: 'msg-1',
    threadId: 'pastor-wright',
    isFromUser: false,
    content:
      'Grace and peace to you in Christ Jesus our Lord. I am Pastor Thomas Wright. If you have prayer requests, questions regarding Scripture, or need confidential spiritual guidance, please feel free to leave a message here.',
    timestamp: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
  },
];

export const INITIAL_JOURNALS: JournalEntity[] = [
  {
    id: 'jrn-1',
    title: 'Finding Rest in Anxious Times',
    content:
      'Today was quite challenging with work deadlines, but taking 15 minutes during lunch to meditate on Psalm 23 reminded me that my identity and security are founded in Christ, not in human productivity.',
    scriptureTag: 'Psalms 23:2',
    gratitudePrompt: 'Grateful for the quiet morning prayer time and health for my family.',
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
  },
];

export const INITIAL_PASTORS: PastorEntity[] = [
  {
    id: 'pastor-wright',
    name: 'Rev. Dr. Thomas Wright',
    roleTitle: 'Senior Pastor',
    bio: 'Serving the congregation for over 18 years with expository preaching and pastoral counseling rooted in historic Christian theology.',
  },
  {
    id: 'pastor-jenkins',
    name: 'Pastor Sarah Jenkins',
    roleTitle: 'Associate & Family Pastor',
    bio: 'Passionate about biblical parenting, flourishing marriages, and discipling the next generation in authentic discipleship.',
  },
  {
    id: 'pastor-miller',
    name: 'David Miller',
    roleTitle: 'Worship & Creative Arts Director',
    bio: 'Guiding the congregation in Christ-centered vocal and liturgical praise, rooted in the Psalms and classical Christian hymns.',
  },
  {
    id: 'pastor-kim',
    name: 'Hannah Kim',
    roleTitle: 'Youth & Outreach Pastor',
    bio: 'Mobilizing students and local evangelism teams to serve downtown shelters, university campuses, and youth small groups.',
  },
];

export const INITIAL_SERMON_ENTITIES: SermonEntity[] = [
  {
    id: 'sermon-ent-1',
    pastorId: 'pastor-wright',
    title: 'Anchored in Unshakable Grace',
    theme: 'Grace',
    sermonDate: '2026-09-06',
    scriptureRefs: ['Romans 8:28-39', 'Romans 8:31'],
    audioUrl: 'track-sermon-1',
    durationSec: 2145,
    isPublished: true,
    createdAt: '2026-09-06T10:00:00.000Z',
    markdownContent: `## An Exposition of Romans 8:28-39

> "What shall we then say to these things? If God be for us, who can be against us?" — Romans 8:31

When the apostle Paul pens the climactic closing to the eighth chapter of Romans, he does not speak from an ivory tower of theoretical optimism. He writes with the scarred hands of a man who was stoned, shipwrecked, and imprisoned. Yet his tone is one of triumphant certainty.

### 1. The Divine Promise of Sovereignty
Paul begins with an unbreakable golden chain: *whom He foreknew, He also predestined to be conformed to the image of His Son*. Every tear, every trial, and every unanswered longing is held within the sovereign stewardship of our heavenly Father. 

Notice key biblical truths from this passage:
* **The Promise is Comprehensive:** All things work together for good, not just the pleasant things.
* **The Good is Defined by God:** Spiritual conformity to Christ Jesus is far higher than temporary earthly ease.
* **The Surety is Absolute:** Nothing in all creation can sever you from the love of God.

### 2. The Five Rhetorical Inquiries
Paul challenges every accusation that our adversary, Satan, or our troubled conscience might raise:
1. *If God is for us, who can be against us?*
2. *He that spared not His own Son, how shall He not with Him also freely give us all things?*
3. *Who shall lay anything to the charge of God's elect?*
4. *Who is he that condemneth?*
5. *Who shall separate us from the love of Christ?*

### 3. Practical Applications for the Week
* Take 10 minutes every morning to read [Romans 8:38-39] aloud.
* Replace anxious self-talk with the promises of Scripture when circumstances feel precarious.
* Reach out to a brother or sister walking through grief with words of reassurance.`,
  },
  {
    id: 'sermon-ent-2',
    pastorId: 'pastor-wright',
    title: 'Walking Through the Valley Without Fear',
    theme: 'Faith',
    sermonDate: '2026-08-30',
    scriptureRefs: ['Psalms 23:1-6', 'John 10:11'],
    audioUrl: 'track-sermon-2',
    durationSec: 1860,
    isPublished: true,
    createdAt: '2026-08-30T10:00:00.000Z',
    markdownContent: `## The Good Shepherd in Dark Valleys

> "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me." — Psalms 23:4

David was a seasoned shepherd who understood the rugged Judean wilderness. In this beloved psalm, he does not promise the absence of valleys, but the steadfast companionship of the Great Shepherd through them.

### Key Theological Insights
* **The Valley is a Pathway, Not a Residence:** David says "walk *through*", not *pitch a tent in*. Valleys lead to higher summer pastures.
* **Shadows Cannot Strike:** The shadow of a dog cannot bite; the shadow of a sword cannot wound; the shadow of death has had its sting extracted at Calvary!
* **The Comfort of the Rod and Staff:**
  * The **rod** protects against wolves and predators.
  * The **staff** gently pulls wandering sheep back from sheer cliffs.

### Personal Reflection
Meditate on [John 10:11] this week: "I am the good shepherd: the good shepherd giveth his life for the sheep."`,
  },
  {
    id: 'sermon-ent-3',
    pastorId: 'pastor-jenkins',
    title: 'Cultivating a Peaceful Home in a Chaotic Age',
    theme: 'Family',
    sermonDate: '2026-08-23',
    scriptureRefs: ['Colossians 3:12-17', 'Ephesians 4:32'],
    audioUrl: 'track-sermon-3',
    durationSec: 1720,
    isPublished: true,
    createdAt: '2026-08-23T10:00:00.000Z',
    markdownContent: `## Biblical Pillars for Christian Households

Our homes ought to be an embassy of the Kingdom of Heaven—sanctuaries of grace and mutual forbearance where the peace of Christ rules our hearts.

### The Wardrobe of the Believer
Paul urges us to clothe ourselves with:
* **Bowels of mercies** (tender compassionate affection)
* **Kindness** in speech and gesture
* **Humility** that considers others first
* **Meekness** (strength harnessed under divine control)
* **Longsuffering** with each other's weaknesses

> "And above all these things put on charity, which is the bond of perfectness." — Colossians 3:14

### Action Steps for Spouses & Parents
1. Establish a 10-minute family prayer rhythm before bedtime.
2. Practice immediate, ungrudging forgiveness when disagreements arise [Ephesians 4:32].
3. Dedicate one evening each week as a screen-free Sabbath dinner.`,
  },
  {
    id: 'sermon-ent-4',
    pastorId: 'pastor-miller',
    title: 'Praise as a Weapon of Spiritual Victory',
    theme: 'Worship',
    sermonDate: '2026-08-16',
    scriptureRefs: ['Psalm 100:1-5', 'Acts 16:25'],
    audioUrl: 'track-sermon-4',
    durationSec: 1540,
    isPublished: true,
    createdAt: '2026-08-16T10:00:00.000Z',
    markdownContent: `## Entering His Gates with Thanksgiving

Worship is never merely emotional recreation; it is the spiritual posture of a soul declaring the goodness and majesty of Almighty God in the midst of adversity.

### Biblical Precedent
* When Paul and Silas were flogged and locked in stocks in the midnight dungeon of Philippi, they **sang hymns of praise to God** [Acts 16:25], and an earthquake shook the foundations of the prison!
* Thanksgiving shifts our gaze from the magnitude of our problems to the infinitude of our God.

> "Enter into his gates with thanksgiving, and into his courts with praise: be thankful unto him, and bless his name." — Psalm 100:4`,
  },
  {
    id: 'sermon-ent-5',
    pastorId: 'pastor-kim',
    title: 'Courage to Stand in the Day of Battle',
    theme: 'Youth',
    sermonDate: '2026-08-09',
    scriptureRefs: ['1 Corinthians 13:1-13', '1 Timothy 4:12'],
    audioUrl: 'track-sermon-5',
    durationSec: 1980,
    isPublished: true,
    createdAt: '2026-08-09T10:00:00.000Z',
    markdownContent: `## An Uncompromising Faith for the Next Generation

God does not call young believers to timidity or cultural conformity, but to be blazing beacons of biblical truth, holiness, and sacrificial love.

### Three Markings of Biblical Courage
1. **Moral Purity in a Permissive Society:** Standing for truth with gentleness and respect.
2. **Love Without Hypocrisy:** Grounded in the enduring nature of Christian charity [1 Corinthians 13:4-8].
3. **Daily Faithfulness in Small Decisions:** Honoring God in study, workplace ethics, and digital habits.

> "Let no man despise thy youth; but be thou an example of the believers, in word, in conversation, in charity, in spirit, in faith, in purity." — 1 Timothy 4:12`,
  },
];
