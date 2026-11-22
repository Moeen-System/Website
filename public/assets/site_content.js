const pair = (ar, en) => ({ ar, en });
const image = (shot, width, height, ar, en) => ({ shot, width, height, alt: pair(ar, en) });

export const infoPages = {
  tasks: {
    path: '/product/tasks/', label: pair('المهام', 'Tasks'), teaser: pair('حالة ومسؤول وموعد لكل مهمة', 'Status, owner, and due date'),
    title: pair('اعرف من يتابع كل مهمة.', 'Know who’s following up.'),
    lead: pair('خطّط على اللوحة، وراجع المواعيد، وتابع ما تغيّر في المهمة من مكان واحد.', 'Plan on the board, check due dates, and follow what changed on each task.'),
    image: image('showcase_board', 1784, 1240, 'لوحة المهام في مُعين موزّعة حسب حالة العمل', 'Moeen task board grouped by status'),
    related: ['chat', 'teams'],
  },
  chat: {
    path: '/product/chat/', label: pair('المحادثات', 'Chat'), teaser: pair('قنوات ورسائل مباشرة', 'Channels and direct messages'),
    title: pair('ناقش العمل في مكانه.', 'Talk where the work happens.'),
    lead: pair('اجمع الفريق في قناة، وتابع التفاصيل الفردية في الرسائل المباشرة.', 'Give the team a channel and use direct messages for individual conversations.'),
    image: image('showcase_chat', 1784, 920, 'قناة فريق في مُعين', 'A team channel in Moeen'),
    related: ['tasks', 'ai_moeen'],
  },
  teams: {
    path: '/product/teams/', label: pair('الفرق', 'Teams'), teaser: pair('أعضاء الفريق ومهامه وقناته', 'Members, tasks, and a channel'),
    title: pair('لكل فريق مكان يجمع عمله.', 'Give each team a place to work.'),
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
    title: pair('اخرج من الاجتماع بخطوة تالية.', 'Leave the meeting with a next step.'),
    lead: pair('حدّد الموعد والمشاركين، ثم سجّل ما اتفقتم عليه في مهام واضحة المسؤولية.', 'Set a time and participants, then record decisions as tasks with clear owners.'),
    image: image('mod_meetings', 1200, 750, 'اجتماع في مُعين تتفرّع منه مهام متابعة', 'A Moeen meeting with linked follow-up tasks'),
    related: ['tasks', 'integrations'],
  },
  mail: {
    path: '/product/mail/', label: pair('البريد', 'Mail'), teaser: pair('بريدك بجانب مهامك', 'Email alongside your tasks'),
    title: pair('تابع البريد من مكان العمل.', 'Follow up on email from your workspace.'),
    lead: pair('اربط حسابك في Gmail أو Outlook واقرأ الرسائل والردود من «البريد» في مُعين.', 'Connect Gmail or Outlook and read messages and replies in Moeen Mail.'),
    image: image('mod_mail', 1200, 750, 'رسالة بريد يتصل بها إجراء إنشاء مهمة', 'An email connected to a follow-up task'),
    related: ['tasks', 'integrations'],
  },
  architecture: {
    path: '/product/architecture/', label: pair('بنية مُعين الهجينة', 'Hybrid architecture'), teaser: pair('إجراءات وصلاحيات مشتركة للفريق والوكلاء', 'Shared actions and permissions'),
    title: pair('الفريق والوكلاء يعملون في مُعين بالإجراءات نفسها.', 'People and agents work through the same actions.'),
    lead: pair('يعمل الفريق والوكلاء على السجلات نفسها. ويمر كل إجراء بالصلاحيات والموافقات نفسها بحسب من ينفّذه وما يطلبه.', 'People and agents work on the same records. Each action follows the applicable permissions and approvals for the requester and the operation.'),
    image: image('app', 2080, 1300, 'قائمة المهام في مُعين بجانب طلب أنشأ منه ai-moeen مهمة في مساحة تجريبية', 'Moeen’s task list next to a task created by ai-moeen in a demo workspace'),
    related: ['ai_moeen', 'mcp', 'knowledge_base'],
  },
  ai_moeen: {
    path: '/ai/ai-moeen/', label: pair('ai-moeen', 'ai-moeen'), teaser: pair('من طلب مكتوب إلى إجراء', 'From a written request to an action'),
    title: pair('فوّض العمل من المحادثة نفسها.', 'Delegate from the conversation.'),
    lead: pair('اطلب من ai-moeen تلخيص نقاش أو إنشاء مهمة أو متابعة ما بقي على الفريق، بالعربية أو الإنجليزية.', 'Ask ai-moeen to summarize a discussion, create a task, or review what’s still open, in Arabic or English.'),
    image: image('ai_scene_response', 790, 450, 'رد تجريبي من ai-moeen يتضمّن ملخّصًا ومهمة جديدة', 'A demo ai-moeen reply with a summary and a new task'),
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
    title: pair('أجب عن أسئلة الفريق من مستنداته.', 'Answer team questions from the source.'),
    lead: pair('تتيح قاعدة المعرفة في خطة برو لـ ai-moeen البحث في المستندات التي يحق لك الوصول إليها.', 'The Pro knowledge base lets ai-moeen search documents you’re allowed to access.'),
    image: image('ai_scene_library', 1324, 900, 'مستندات الإطلاق في مكتبة مُعين', 'Launch documents in the Moeen library'),
    related: ['data', 'ai_moeen'],
  },
  skills: {
    path: '/ai/skills/', label: pair('المهارات', 'Skills'), teaser: pair('تعليمات تستخدمها في أكثر من طلب', 'Instructions you can reuse'),
    title: pair('اكتب طريقة العمل مرة واحدة.', 'Write your workflow instructions once.'),
    lead: pair('احفظ خطوات العمل المتكرر في مهارة، واخترها عند إرسال طلب إلى ai-moeen.', 'Save the steps for recurring work as a skill and select it when you send a request to ai-moeen.'),
    related: ['ai_moeen', 'knowledge_base'],
  },
  integrations: {
    path: '/ai/integrations/', label: pair('التكاملات', 'Integrations'), teaser: pair('اربط بريدك وتقويمك وأدوات اجتماعاتك', 'Connect mail, calendars, and meeting tools'),
    title: pair('أبقِ أدواتك مرتبطة بمساحة العمل.', 'Keep your tools connected to the workspace.'),
    lead: pair('استخدم دليل التكاملات لمعرفة ما يتيحه كل تطبيق، ثم اربط الحسابات التي يحتاج إليها فريقك.', 'Use the integrations directory to see what each app supports, then connect the accounts your team needs.'),
    image: image('integrations', 1440, 1120, 'معاينة دليل التكاملات في مُعين', 'Moeen integrations directory in a demo workspace'),
    related: ['mail', 'meetings', 'mcp'],
  },
  about: {
    path: '/company/about/', label: pair('من نحن', 'About us'),
    title: pair('نبني مُعين ليعمل الفريق ووكلاؤه معًا.', 'We’re building Moeen for teams and their agents.'),
    lead: pair('مُعين مساحة عمل تبدأ بالعربية، وتجمع العمل اليومي وسياقه في مكان واحد.', 'Moeen is an Arabic-first workspace that keeps everyday work and its context together.'),
    related: ['architecture', 'roadmap', 'blog'],
  },
  affiliate: {
    path: '/company/affiliate/', label: pair('برنامج الإحالة', 'Affiliate program'),
    lead: pair('ستجد هنا شروط برنامج الإحالة وطريقة التقديم عند فتحه.', 'Program terms and application details will appear here when enrollment opens.'),
    related: ['about', 'pricing'],
  },
  support: {
    path: '/company/support/', label: pair('الدعم', 'Support'),
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
    lead: pair('أفكار عن تنظيم عمل الفرق وتفويضه، من واقع ما نبنيه في مُعين.', 'Notes on organizing and delegating team work, drawn from what we’re building in Moeen.'),
  },
  conversations_post: {
    path: '/blog/from-conversation-to-task/', label: pair('من نقاش الفريق إلى مهمة واضحة', 'From a team discussion to a clear task'),
    topic: pair('تنظيم العمل', 'Ways of working'),
    lead: pair('حين يتفق الفريق على خطوة تالية، سجّلها حيث يمكن لأصحابها متابعتها.', 'When the team agrees on a next step, record it where its owners can follow through.'),
    image: image('mod_chat', 1200, 750, 'محادثة في مُعين يتبعها إنشاء مهمة', 'A Moeen conversation followed by task creation'),
    related: ['chat', 'tasks'],
  },
  approvals_post: {
    path: '/blog/when-agents-need-approval/', label: pair('متى يحتاج الوكيل إلى موافقة؟', 'When does an agent need approval?'),
    topic: pair('الوكلاء والموافقات', 'Agents and approvals'),
    lead: pair('تفويض إجراء يوفّر وقتًا للفريق. وتساعد الموافقة على إبقاء القرارات الحساسة بيد أصحابها.', 'Delegation saves time. Approvals keep sensitive decisions with the people responsible for them.'),
    image: image('audit', 1520, 960, 'سجل التدقيق في مساحة عمل تجريبية', 'Audit log in a demo workspace'),
    related: ['architecture', 'ai_moeen'],
  },
  meetings_post: {
    path: '/blog/follow-up-after-a-meeting/', label: pair('كيف تتابع قرارات الاجتماع؟', 'How to follow up after a meeting'),
    topic: pair('الاجتماعات', 'Meetings'),
    lead: pair('اتفقوا على المطلوب قبل المغادرة، ثم تابعوا كل قرار مع من يتولّاه.', 'Agree on what needs doing before you leave, then follow each decision with its owner.'),
    image: image('mod_meetings', 1200, 750, 'اجتماع تجريبي مع مهام متابعة', 'A demo meeting with follow-up tasks'),
    related: ['meetings', 'tasks'],
  },
  docs: { path: '/docs/', label: pair('التوثيق', 'Docs') },
};

export const blogPosts = ['conversations_post', 'approvals_post', 'meetings_post'];
const primaryPages = {
  changelog: { path: '/changelog/', label: pair('سجل التحديثات', 'Changelog') },
  roadmap: { path: '/roadmap/', label: pair('خريطة الطريق', 'Roadmap') },
  pricing: { path: '/pricing/', label: pair('الأسعار', 'Pricing') },
};

export const sitePages = { ...primaryPages, ...infoPages };

export const navigation = [
  { id: 'product', label: pair('المنتج', 'Product'),
    tiles: [['tasks', 'tasks'], ['chat', 'chat'], ['teams', 'teams'], ['data', 'notes'], ['meetings', 'meetings'], ['mail', 'mail']],
    featured: 'architecture' },
  { id: 'ai', label: pair('الذكاء الاصطناعي', 'AI'),
    tiles: [['ai_moeen', 'ask'], ['mcp', 'workflow'], ['knowledge_base', 'search'], ['skills', 'skills']],
    featured: 'integrations' },
  'changelog', 'roadmap', 'blog', 'pricing',
  { id: 'company', label: pair('الشركة', 'Company'),
    tiles: [['about'], ['affiliate'], ['support'], ['join']] },
  'docs',
];
