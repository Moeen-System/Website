const pair = (ar, en) => ({ ar, en });
const image = (shot, width, height, ar, en) => ({ shot, width, height, alt: pair(ar, en) });

export const infoPages = {
  tasks: {
    path: '/product/tasks/', label: pair('المهام', 'Tasks'), teaser: pair('حالة ومسؤول وموعد لكل مهمة', 'Status, owner, and due date'),
    title: pair('لكل مهمة مسؤول يعرفه الفريق.', 'Every task has an owner the team can see.'),
    lead: pair('خطّط على اللوحة، وراجع المواعيد، وتابع ما تغيّر في المهمة من مكان واحد.', 'Plan on the board, check due dates, and follow what changed on each task.'),
    image: image('showcase_board', 1784, 1240, 'لوحة المهام في مُعين موزّعة حسب حالة العمل', 'Moeen task board grouped by status'),
    related: ['chat', 'teams'],
  },
  chat: {
    path: '/product/chat/', label: pair('المحادثات', 'Chat'), teaser: pair('قنوات ورسائل مباشرة', 'Channels and direct messages'),
    title: pair('ناقش العمل حيث يعمل الفريق.', 'Talk where the work happens.'),
    lead: pair('اجمع الفريق في قناة، وتابع التفاصيل الفردية في الرسائل المباشرة.', 'Give the team a channel and use direct messages for individual conversations.'),
    image: image('showcase_chat', 1784, 920, 'قناة فريق في مُعين', 'A team channel in Moeen'),
    related: ['tasks', 'ai_moeen'],
  },
  teams: {
    path: '/product/teams/', label: pair('الفرق', 'Teams'), teaser: pair('أعضاء الفريق ومهامه وقناته', 'Members, tasks, and a channel'),
    title: pair('مكان واحد لعمل كل فريق.', 'Give each team a place to work.'),
    lead: pair('اجمع أعضاء الفريق ومهامه وقناته وملفاته، ليعرف الجميع أين يجدون ما يحتاجون إليه.', 'Keep the team’s members, tasks, channel, and files together so everyone knows where to look.'),
    image: image('mod_teams', 1200, 750, 'رسم من واجهة مُعين يربط الفريق بأعضائه وقناته ومهامه', 'Moeen interface composition connecting a team with its members, channel, and tasks'),
    related: ['tasks', 'data'],
  },
  data: {
    path: '/product/data/', label: pair('البيانات', 'Data'), teaser: pair('ملفات ومجلدات بصلاحيات واضحة', 'Files, folders, and access controls'),
    title: pair('احتفظ بملفات العمل بجانب الفريق.', 'Keep work files with the team.'),
    lead: pair('رتّب الملفات في مجلدات، واعرضها من مساحة العمل، وحدّد من يستطيع الوصول إليها.', 'Organize files in folders, preview them in the workspace, and control who can open them.'),
    image: image('ai_scene_library', 1324, 900, 'ملفات عمل منظّمة في مكتبة مُعين', 'Work files organized in the Moeen library'),
    related: ['teams', 'knowledge_base'],
  },
  meetings: {
    path: '/product/meetings/', label: pair('الاجتماعات', 'Meetings'), teaser: pair('جدولة ومهام للمتابعة', 'Scheduling and follow-ups'),
    title: pair('لكل اجتماع ما يتبعه من خطوات.', 'Every meeting leads to a next step.'),
    lead: pair('حدّد الموعد والمشاركين، ثم سجّل ما اتفقتم عليه في مهام واضحة المسؤولية.', 'Set a time and participants, then record decisions as tasks with clear owners.'),
    image: image('mod_meetings', 1200, 750, 'اجتماع في مُعين تتفرّع منه مهام متابعة', 'A Moeen meeting with linked follow-up tasks'),
    related: ['tasks', 'integrations'],
  },
  mail: {
    path: '/product/mail/', label: pair('البريد', 'Mail'), teaser: pair('بريدك بجانب مهامك', 'Email alongside your tasks'),
    title: pair('تابع بريدك من مُعين.', 'Follow up on email in Moeen.'),
    lead: pair('اربط حسابك في Gmail أو Outlook واقرأ الرسائل والردود من «البريد» في مُعين.', 'Connect Gmail or Outlook and read messages and replies in Moeen Mail.'),
    image: image('mod_mail', 1200, 750, 'رسالة بريد يتصل بها إجراء إنشاء مهمة', 'An email connected to a follow-up task'),
    related: ['tasks', 'integrations'],
  },
  architecture: {
    path: '/product/architecture/', label: pair('بنية مُعين الهجينة', 'Hybrid architecture'), teaser: pair('إجراءات وصلاحيات مشتركة للفريق والوكلاء', 'Shared actions and permissions'),
    title: pair('في مُعين، الإجراءات نفسها للفريق ووكلاء الذكاء الاصطناعي.', 'People and agents work through the same actions.'),
    lead: pair('يعمل الفريق والوكلاء على السجلات نفسها. ويمر كل إجراء بالصلاحيات والموافقات نفسها بحسب من ينفّذه وما يطلبه.', 'People and agents work on the same records. Each action follows the applicable permissions and approvals for the requester and the operation.'),
    image: image('app', 2080, 1300, 'قائمة المهام في مُعين بجانب طلب أنشأ منه AI مهمة في مساحة تجريبية', 'Moeen’s task list next to a task created by AI in a demo workspace'),
    related: ['ai_moeen', 'mcp', 'knowledge_base'],
  },
  ai_moeen: {
    path: '/ai/ai-moeen/', label: pair('AI', 'AI'), teaser: pair('من طلب مكتوب إلى إجراء', 'From a written request to an action'),
    title: pair('اكتب طلبك كما تكتبه لزميلك.', 'Ask the way you’d ask a colleague.'),
    lead: pair('ابدأ مع AI، أو أنشئ وكيلًا بتعليمات ومهارات تناسب عملك. يعمل الوكلاء على سجلات الفريق ضمن صلاحياتك.', 'Start with AI, or create an agent with instructions and skills for your work. Agents work on team records within your permissions.'),
    image: image('ai_scene_response', 790, 402, 'رد تجريبي من AI يتضمّن ملخّصًا ومهمة جديدة', 'A demo AI reply with a summary and a new task'),
    related: ['architecture', 'knowledge_base', 'skills'],
  },
  mcp: {
    path: '/ai/mcp/', label: pair('MCP', 'MCP'), teaser: pair('أدوات المهام لوكلائك الخارجيين', 'Task tools for external agents'),
    title: pair('اربط وكيلك الخارجي بأدوات مُعين.', 'Connect an external agent to Moeen.'),
    lead: pair('يتيح MCP للعملاء المتوافقين استخدام أدوات المهام في مساحة العمل ضمن النطاق الذي يحدّده المالك أو المشرف المخوّل.', 'MCP gives compatible clients access to workspace task tools within the scope set by an owner or authorized admin.'),
    related: ['architecture', 'integrations'],
  },
  knowledge_base: {
    path: '/ai/knowledge-base/', label: pair('قاعدة المعرفة', 'Knowledge base'), teaser: pair('سياق العمل من مستنداتك', 'Work context from your documents'),
    title: pair('أجب عن الأسئلة من مستندات الفريق.', 'Answer team questions from the source.'),
    lead: pair('تتيح قاعدة المعرفة في خطة برو لـ AI البحث في المستندات التي يحق لك الوصول إليها.', 'The Pro knowledge base lets AI search documents you’re allowed to access.'),
    image: image('ai_scene_library', 1324, 900, 'مستندات الإطلاق في مكتبة مُعين', 'Launch documents in the Moeen library'),
    related: ['data', 'ai_moeen'],
  },
  skills: {
    path: '/ai/skills/', label: pair('المهارات', 'Skills'), teaser: pair('تعليمات تستخدمها في أكثر من طلب', 'Instructions you can reuse'),
    title: pair('اكتب طريقة العمل مرة، واخترها متى احتجت.', 'Write the steps once.'),
    lead: pair('احفظ خطوات العمل المتكرر في مهارة، واخترها عند إرسال طلب إلى AI.', 'Save the steps for recurring work as a skill and select it when you send a request to AI.'),
    related: ['ai_moeen', 'knowledge_base'],
  },
  integrations: {
    path: '/ai/integrations/', label: pair('التكاملات', 'Integrations'), teaser: pair('اربط بريدك وتقويمك وأدوات اجتماعاتك', 'Connect mail, calendars, and meeting tools'),
    title: pair('أبقِ أدواتك مرتبطة بمُعين.', 'Keep your tools connected to Moeen.'),
    lead: pair('استخدم دليل التكاملات لمعرفة ما يتيحه كل تطبيق، ثم اربط الحسابات التي يحتاج إليها فريقك.', 'Use the integrations directory to see what each app supports, then connect the accounts your team needs.'),
    image: image('integrations', 1440, 1120, 'معاينة دليل التكاملات في مُعين', 'Moeen integrations directory in a demo workspace'),
    related: ['mail', 'meetings', 'mcp'],
  },
  about: {
    path: '/company/about/', label: pair('من نحن', 'About us'),
    title: pair('نبني مُعين ليعمل الفريق مع وكلاء الذكاء الاصطناعي.', 'We’re building Moeen for teams and their agents.'),
    lead: pair('مُعين مساحة عمل تبدأ بالعربية، وتجمع العمل اليومي وسياقه في مكان واحد.', 'Moeen is an Arabic-first workspace that keeps everyday work and its context together.'),
    related: ['architecture', 'roadmap', 'blog'],
  },
  affiliate: {
    path: '/company/affiliate/', label: pair('التسويق بالعمولة', 'Affiliate marketing'),
    title: pair('التسويق بالعمولة مع مُعين', 'Affiliate marketing with Moeen'),
    lead: pair('ستجد هنا شروط التسويق بالعمولة وطريقة التقديم عند فتح الباب.', 'Program terms and application details will appear here when enrollment opens.'),
    related: ['about', 'pricing'],
  },
  support: {
    path: '/company/support/', label: pair('الدعم', 'Support'),
    title: pair('الدعم في مُعين', 'Support'),
    lead: pair('اعثر على المساعدة التي تحتاج إليها للبدء أو العودة إلى مساحة عملك.', 'Find help getting started or getting back to your workspace.'),
    related: ['changelog', 'data'],
  },
  join: {
    path: '/company/join-us/', label: pair('انضم إلينا', 'Join us'),
    title: pair('العمل مع فريق مُعين', 'Work with the Moeen team'),
    lead: pair('نبني أدوات عمل تبدأ بالعربية وتتيح للفِرق تفويض العمل لوكلائها مع بقاء القرار بيدها.', 'We build Arabic-first tools that let teams delegate work to agents while keeping decisions in their hands.'),
    related: ['about', 'roadmap'],
  },
  blog: {
    path: '/blog/', label: pair('المدوّنة', 'Blog'),
    title: pair('مدوّنة مُعين', 'Blog'),
    lead: pair('أفكار عن تنظيم عمل الفرق وتفويضه، من واقع ما نبنيه في مُعين.', 'Notes on organizing and delegating team work, drawn from what we’re building in Moeen.'),
  },
  conversations_post: {
    path: '/blog/from-conversation-to-task/', label: pair('من النقاش إلى مهمة واضحة للفريق', 'From a team discussion to a clear task'),
    topic: pair('تنظيم العمل', 'Ways of working'),
    lead: pair('حين يتفق الفريق على خطوة تالية، سجّلها حيث يمكن لأصحابها متابعتها.', 'When the team agrees on a next step, record it where its owners can follow through.'),
    image: image('mod_chat', 1200, 750, 'نقاش في قناة المنتج في مُعين', 'A discussion in the Moeen product channel'),
    related: ['chat', 'tasks'],
  },
  approvals_post: {
    path: '/blog/when-agents-need-approval/', label: pair('متى يحتاج الوكيل إلى موافقتك؟', 'When does an agent need approval?'),
    topic: pair('الوكلاء والموافقات', 'Agents and approvals'),
    lead: pair('تفويض إجراء يوفّر وقتًا للفريق. وتساعد الموافقة على إبقاء القرارات الحساسة بيد أصحابها.', 'Delegation saves time. Approvals keep sensitive decisions with the people responsible for them.'),
    image: image('audit', 1520, 960, 'سجل التدقيق في مساحة عمل تجريبية', 'Audit log in a demo workspace'),
    related: ['architecture', 'ai_moeen'],
  },
  meetings_post: {
    path: '/blog/follow-up-after-a-meeting/', label: pair('كيف تتابع قرارات الاجتماعات؟', 'How to follow up after a meeting'),
    topic: pair('الاجتماعات', 'Meetings'),
    lead: pair('اتفقوا على المطلوب قبل المغادرة، ثم تابعوا كل قرار مع من يتولّاه.', 'Agree on what needs doing before you leave, then follow each decision with its owner.'),
    image: image('mod_meetings', 1200, 750, 'اجتماع تجريبي مع مهام متابعة', 'A demo meeting with follow-up tasks'),
    related: ['meetings', 'tasks'],
  },
  docs: { path: '/docs/', label: pair('الدليل', 'Docs') },
};

export const blogPosts = ['conversations_post', 'approvals_post', 'meetings_post'];
const primaryPages = {
  changelog: { path: '/changelog/', label: pair('سجل التحديثات', 'Changelog'), navLabel: pair('التحديثات', 'Changelog') },
  roadmap: { path: '/roadmap/', label: pair('خريطة الطريق', 'Roadmap'), navLabel: pair('البوصلة', 'Roadmap') },
  pricing: { path: '/pricing/', label: pair('الأسعار', 'Pricing'), title: pair('الأسعار والاشتراكات', 'Pricing') },
};

export const sitePages = { ...primaryPages, ...infoPages };

const upcomingUseCases = [
  [pair('الموارد البشرية', 'Human resources'), 'people'],
  [pair('المالية', 'Finance'), 'audit'],
  [pair('العمليات', 'Operations'), 'workflow'],
  [pair('المبيعات', 'Sales'), 'meetings'],
  [pair('التسويق', 'Marketing'), 'mail'],
  [pair('خدمة العملاء', 'Customer support'), 'chat'],
  [pair('تطوير المنتجات', 'Product development'), 'tasks'],
  [pair('المشتريات', 'Procurement'), 'approvals'],
];

export const upcomingModules = [
  ...upcomingUseCases.map(([name]) => name),
  pair('المستندات', 'Documents'),
  pair('الجداول', 'Spreadsheets'),
  pair('العروض', 'Presentations'),
  pair('العملاء', 'CRM'),
  pair('الهندسة', 'Engineering'),
  pair('الأتمتة', 'Automations'),
];

export const navigation = [
  { id: 'product', label: pair('المنتج', 'Product'),
    sections: [
      { label: pair('مساحة العمل', 'Workspace'),
        tiles: [['tasks', 'tasks'], ['chat', 'chat'], ['teams', 'teams'], ['data', 'notes'], ['meetings', 'meetings'], ['mail', 'mail']] },
      { label: pair('الذكاء الاصطناعي', 'AI'),
        tiles: [['ai_moeen', 'ask'], ['mcp', 'workflow'], ['knowledge_base', 'search'], ['skills', 'skills']] },
    ],
    featured: 'architecture', bottom: ['integrations', 'workflow'] },
  { id: 'use_cases', label: pair('حالات الاستخدام', 'Use cases'),
    upcoming: upcomingUseCases },
  'changelog', 'roadmap', 'blog', 'pricing',
  { id: 'company', label: pair('الشركة', 'Company'),
    tiles: [['about', 'teams'], ['affiliate', 'workflow'], ['support', 'chat'], ['join', 'people']] },
  'docs',
];
