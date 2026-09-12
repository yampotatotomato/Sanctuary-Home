// Initial seed data for Church Sanctuary
import '../models/models.dart';

const List<StaffAccount> kStaffAccounts = [
  StaffAccount(
    name: 'Rev. Dr. Thomas Wright',
    role: 'Senior Pastor',
    presetPasscode: '1001',
    avatarInitials: 'TW',
  ),
  StaffAccount(
    name: 'Pastor Sarah Jenkins',
    role: 'Associate & Family Pastor',
    presetPasscode: '2002',
    avatarInitials: 'SJ',
  ),
  StaffAccount(
    name: 'David Miller',
    role: 'Worship & Creative Arts Director',
    presetPasscode: '3003',
    avatarInitials: 'DM',
  ),
  StaffAccount(
    name: 'Hannah Kim',
    role: 'Youth & Outreach Pastor',
    presetPasscode: '4004',
    avatarInitials: 'HK',
  ),
];

final List<AnnouncementModel> kInitialAnnouncements = [
  AnnouncementModel(
    id: 'ann-1',
    title: 'Sunday Worship: The Power of Steadfast Faith',
    content: 'Join us this Sunday at 9:00 AM and 11:15 AM as Senior Pastor Wright kicks off our new sermon series through the Book of Romans. Nursery and children\'s ministry available during both services.',
    authorName: 'Rev. Dr. Thomas Wright',
    scriptureRef: 'Romans 8:31-39',
    ctaLabel: 'Plan Your Visit',
    ctaLink: '#visit',
    category: 'Worship',
    isPinned: true,
    isScheduled: false,
    publishedAt: DateTime.now().subtract(const Duration(hours: 2)),
    isBroadcastSent: true,
  ),
  AnnouncementModel(
    id: 'ann-2',
    title: 'Annual Community Food Drive & Outreach Day',
    content: 'We are partnering with the local shelter to provide 500 hot meals and dry goods. Volunteers meet at the Family Life Center Saturday at 8:30 AM.',
    authorName: 'Hannah Kim',
    scriptureRef: 'Matthew 25:35-40',
    ctaLabel: 'Sign Up to Volunteer',
    ctaLink: '#volunteer',
    category: 'Outreach',
    isPinned: true,
    isScheduled: false,
    publishedAt: DateTime.now().subtract(const Duration(hours: 8)),
    isBroadcastSent: true,
  ),
  AnnouncementModel(
    id: 'ann-3',
    title: 'Night of Acoustic Praise & Communion',
    content: 'An intimate evening of prayer, scripture meditation, and acoustic worship led by David Miller and the Sanctuary Choir. Doors open at 6:45 PM.',
    authorName: 'David Miller',
    scriptureRef: 'Psalm 100:1-5',
    ctaLabel: 'Add to Calendar',
    ctaLink: '#calendar',
    category: 'Worship',
    isPinned: false,
    isScheduled: false,
    publishedAt: DateTime.now().subtract(const Duration(days: 1)),
    isBroadcastSent: false,
  ),
  AnnouncementModel(
    id: 'ann-4',
    title: 'Family & Marriage Weekend Retreat',
    content: 'Registration is now open for our annual retreat at Pinecrest Center. Early bird rates available until the end of the month.',
    authorName: 'Pastor Sarah Jenkins',
    scriptureRef: 'Colossians 3:12-14',
    ctaLabel: 'Register Family',
    ctaLink: '#retreat',
    category: 'Community',
    isPinned: false,
    isScheduled: false,
    publishedAt: DateTime.now().subtract(const Duration(days: 2)),
    isBroadcastSent: false,
  ),
  AnnouncementModel(
    id: 'ann-5',
    title: 'Youth Summer Mission Trip Informational Meeting',
    content: 'Parents and youth (grades 8-12) are invited to an informational lunch this Sunday right after the 11:15 AM service in Room 204.',
    authorName: 'Hannah Kim',
    scriptureRef: '1 Timothy 4:12',
    ctaLabel: 'View Details',
    ctaLink: '#youth',
    category: 'Youth',
    isPinned: false,
    isScheduled: false,
    publishedAt: DateTime.now().subtract(const Duration(days: 3)),
    isBroadcastSent: false,
  ),
];

final List<JoinedGroupModel> kInitialPrayerGroups = [
  JoinedGroupModel(
    id: 'grp-1',
    groupName: 'Grace Sanctuary Men\'s Fellowship',
    category: "Men's",
    meetingTime: 'Tuesdays at 6:30 AM (Room 102)',
    joinedAt: DateTime.now().subtract(const Duration(days: 10)),
    rsvpStatus: 'attending',
  ),
  JoinedGroupModel(
    id: 'grp-2',
    groupName: 'Sisters in Christ Prayer Circle',
    category: "Women's",
    meetingTime: 'Wednesdays at 7:00 PM (Chapel)',
    joinedAt: DateTime.now().subtract(const Duration(days: 5)),
    rsvpStatus: 'interested',
  ),
  JoinedGroupModel(
    id: 'grp-3',
    groupName: 'Ignite Youth & Young Adults',
    category: 'Youth',
    meetingTime: 'Fridays at 6:30 PM (Youth Loft)',
    joinedAt: DateTime.now().subtract(const Duration(days: 2)),
    rsvpStatus: 'none',
  ),
  JoinedGroupModel(
    id: 'grp-4',
    groupName: 'Hope City Food & Compassion Outreach',
    category: 'Outreach',
    meetingTime: 'Saturdays at 9:00 AM (Fellowship Hall)',
    joinedAt: DateTime.now().subtract(const Duration(days: 1)),
    rsvpStatus: 'none',
  ),
  JoinedGroupModel(
    id: 'grp-5',
    groupName: 'Sanctuary Worship & Intercession',
    category: 'Worship',
    meetingTime: 'Thursdays at 6:00 PM (Main Sanctuary)',
    joinedAt: DateTime.now().subtract(const Duration(days: 14)),
    rsvpStatus: 'attending',
  ),
];

final List<Sermon> kSampleSermons = [
  const Sermon(
    id: 'sermon-1',
    title: 'Anchored in Unshakable Grace',
    speaker: 'Rev. Dr. Thomas Wright',
    series: 'Romans: The Heart of the Gospel',
    category: 'Grace',
    durationSec: 2145, // 35:45
    audioUrl: 'https://archive.org/download/kjv_audio_bible/psalm_23.mp3',
    scriptureRef: 'Romans 8:28-39',
  ),
  const Sermon(
    id: 'sermon-2',
    title: 'Walking Through the Valley Without Fear',
    speaker: 'Rev. Dr. Thomas Wright',
    series: 'Psalms of Solace',
    category: 'Faith',
    durationSec: 1860, // 31:00
    audioUrl: 'https://archive.org/download/kjv_audio_bible/psalm_23.mp3',
    scriptureRef: 'Psalm 23:1-6',
  ),
  const Sermon(
    id: 'sermon-3',
    title: 'Cultivating a Peaceful Home in a Chaotic Age',
    speaker: 'Pastor Sarah Jenkins',
    series: 'Flourishing Families',
    category: 'Family',
    durationSec: 1720, // 28:40
    audioUrl: 'https://archive.org/download/kjv_audio_bible/psalm_23.mp3',
    scriptureRef: 'Colossians 3:12-17',
  ),
  const Sermon(
    id: 'sermon-4',
    title: 'Praise as a Weapon of Victory',
    speaker: 'David Miller',
    series: 'The Heart of the Worshipper',
    category: 'Worship',
    durationSec: 1540, // 25:40
    audioUrl: 'https://archive.org/download/kjv_audio_bible/psalm_23.mp3',
    scriptureRef: 'Psalm 100:1-5',
  ),
  const Sermon(
    id: 'sermon-5',
    title: 'Courage to Stand in the Day of Battle',
    speaker: 'Hannah Kim',
    series: 'Unashamed Generation',
    category: 'Youth',
    durationSec: 1980, // 33:00
    audioUrl: 'https://archive.org/download/kjv_audio_bible/psalm_23.mp3',
    scriptureRef: 'Ephesians 6:10-18',
  ),
];

final List<Devotional> kSampleDevotionals = [
  const Devotional(
    date: 'Today',
    title: 'The Lord is My Shepherd: Rest in His Care',
    morningReflection: 'David writes not as a detached philosopher, but as an experienced shepherd who intimately understood the vulnerabilities of sheep. When he declares "The Lord is my shepherd; I shall not want," he testifies to a God whose providence anticipates every hunger, every exhaustion, and every danger before we ever whisper our prayer.',
    eveningReflection: 'As twilight falls, examine the pastures where your soul wandered today. Did you feed on anxious headlines, or did you rest in the green pastures of His promises? Rest tonight with the confidence that the Good Shepherd neither slumbers nor sleeps.',
    scriptureRefs: ['Psalm 23:1', 'Psalm 23:2', 'John 10:11'],
    questions: [
      'In which specific area of your life are you struggling to trust God\'s provision?',
      'How can you intentionally yield that burden to the Shepherd before going to sleep?'
    ],
    closingPrayer: 'Heavenly Father, thank You for being my Shepherd. Guide my footsteps into paths of righteousness for Your name\'s sake. Quiet my anxious thoughts tonight, and grant me restful sleep in Your unfailing presence. Amen.',
    audioUrl: 'https://archive.org/download/kjv_audio_bible/psalm_23.mp3',
  ),
  const Devotional(
    date: 'Yesterday',
    title: 'More Than Conquerors Through Christ',
    morningReflection: 'Paul reminds us that in all things—tribulation, distress, persecution, famine, nakedness, danger, or sword—we are more than conquerors through Him who loved us. Our victory does not mean the absence of difficulty, but the guaranteed triumph of divine love in the midst of it.',
    eveningReflection: 'Reflect upon the moments today where you felt small or overwhelmed. Christ has already conquered the world; your security is anchored in His finished work on the Cross.',
    scriptureRefs: ['Romans 8:31', 'Romans 8:37', 'John 16:33'],
    questions: [
      'What circumstance today made you feel overwhelmed?',
      'How does knowing nothing can separate you from God\'s love reframe your perspective?'
    ],
    closingPrayer: 'Lord Jesus, You conquered death and sin. Anchor my spirit today in Your eternal victory, that I may walk with boldness and extend grace to everyone I encounter. Amen.',
    audioUrl: 'https://archive.org/download/kjv_audio_bible/psalm_23.mp3',
  ),
];
