const pair = (ar, en) => ({ ar, en });
const section = (ar, en, bodyAr, bodyEn) => ({ title: pair(ar, en), body: pair(bodyAr, bodyEn) });
const image = (shot, width, height, ar, en) => ({ shot, width, height, alt: pair(ar, en) });

export const infoPages = {
  tasks: {
    path: '/product/tasks/', label: pair('المهام', 'Tasks'), teaser: pair('حالة ومسؤول وموعد لكل مهمة', 'Status, owner, and due date'),
    title: pair('اعرف من يتابع كل مهمة.', 'Know who’s following up.'),
    lead: pair('خطّط على اللوحة، وراجع المواعيد، وتابع ما تغيّر في المهمة من مكان واحد.', 'Plan on the board, check due dates, and follow what changed on each task.'),
    image: image('showcase_board', 1784, 1240, 'لوحة المهام في مُعين موزّعة حسب حالة العمل', 'Moeen task board grouped by status'),
    sections: [
      section('رتّب العمل حسب حالته', 'Organize work by status', 'انقل المهمة بين مراحل العمل، وصفِّ اللوحة حسب الفريق أو المسؤول أو الأولوية.', 'Move tasks through work stages and filter the board by team, assignee, or priority.'),
      section('احتفظ بالتفاصيل مع المهمة', 'Keep the details with the task', 'تجد التعليقات والمرفقات وتغييرات المسؤول والحالة في سجل المهمة نفسه.', 'Find comments, attachments, and changes to ownership or status on the task itself.'),
    ], related: ['chat', 'teams'],
  },
  chat: {
    path: '/product/chat/', label: pair('المحادثات', 'Chat'), teaser: pair('قنوات ورسائل مباشرة', 'Channels and direct messages'),
    title: pair('ناقش العمل في مكانه.', 'Talk where the work happens.'),
    lead: pair('اجمع الفريق في قناة، وتابع التفاصيل الفردية في الرسائل المباشرة.', 'Give the team a channel and use direct messages for individual conversations.'),
    image: image('showcase_chat', 1784, 920, 'قناة فريق في مُعين', 'A team channel in Moeen'),
    sections: [
      section('ارجع إلى ما اتفقتم عليه', 'Find what the team agreed on', 'ثبّت الرسائل التي يرجع إليها الفريق، واحتفظ بالمرفقات بجانب النقاش.', 'Pin messages the team will need again and keep attachments next to the discussion.'),
      section('حوّل الاتفاق إلى متابعة', 'Turn a decision into a follow-up', 'أنشئ مهمة من الرسالة لتتابعها على اللوحة، أو اطلب من ai-moeen إنشاءها وإسنادها.', 'Create a task from a message to track it on the board, or ask ai-moeen to create and assign it.'),
    ], related: ['tasks', 'ai_moeen'],
  },
  teams: {
    path: '/product/teams/', label: pair('الفرق', 'Teams'), teaser: pair('أعضاء الفريق ومهامه وقناته', 'Members, tasks, and a channel'),
    title: pair('لكل فريق مكان يجمع عمله.', 'Give each team a place to work.'),
    lead: pair('اجمع أعضاء الفريق ومهامه وقناته وملفاته، ليعرف الجميع أين يجدون ما يحتاجون إليه.', 'Keep the team’s members, tasks, channel, and files together so everyone knows where to look.'),
    image: image('mod_teams', 1200, 750, 'رسم من واجهة مُعين يربط الفريق بأعضائه وقناته ومهامه', 'Moeen interface composition connecting a team with its members, channel, and tasks'),
    sections: [
      section('حدّد مسؤوليات الفريق', 'Set out what the team owns', 'اكتب نبذة عن عمل الفريق، وأضف أعضائه وحدّد من يستطيع الوصول إلى موارده.', 'Describe the team’s work, add its members, and control who can access its resources.'),
      section('تابع التغييرات من صفحة الفريق', 'Follow changes from the team page', 'راجع المهام ونشاط الفريق لتعرف ما أُنجز وما يحتاج إلى متابعة.', 'Review tasks and team activity to see what’s done and what needs follow-up.'),
    ], related: ['tasks', 'data'],
  },
  data: {
    path: '/product/data/', label: pair('البيانات', 'Data'), teaser: pair('ملفات ومجلدات بصلاحيات واضحة', 'Files, folders, and access controls'),
    title: pair('احتفظ بملفات العمل بجانب الفريق.', 'Keep work files with the team.'),
    lead: pair('رتّب الملفات في مجلدات، واعرضها من مساحة العمل، وحدّد من يستطيع الوصول إليها.', 'Organize files in folders, preview them in the workspace, and control who can open them.'),
    image: image('ai_scene_library', 1324, 900, 'ملفات عمل منظّمة في مكتبة مُعين', 'Work files organized in the Moeen library'),
    sections: [
      section('نظّم الملفات بطريقتك', 'Organize files your way', 'أنشئ المجلدات، وانقل الملفات أو أعد تسميتها، واختر العرض الذي يناسبك.', 'Create folders, move or rename files, and choose the view that suits your work.'),
      section('شارك الملفات مع من يحتاج إليها', 'Share files with the people who need them', 'تسري صلاحيات المجلد على محتوياته. وتظهر مرفقات القناة في «البيانات» ضمن صلاحيات القناة.', 'Folder permissions apply to their contents. Channel attachments appear in Data under the channel’s access rules.'),
    ], related: ['teams', 'knowledge_base'],
  },
  meetings: {
    path: '/product/meetings/', label: pair('الاجتماعات', 'Meetings'), teaser: pair('جدولة ومهام للمتابعة', 'Scheduling and follow-ups'),
    title: pair('اخرج من الاجتماع بخطوة تالية.', 'Leave the meeting with a next step.'),
    lead: pair('حدّد الموعد والمشاركين، ثم سجّل ما اتفقتم عليه في مهام واضحة المسؤولية.', 'Set a time and participants, then record decisions as tasks with clear owners.'),
    image: image('mod_meetings', 1200, 750, 'اجتماع في مُعين تتفرّع منه مهام متابعة', 'A Moeen meeting with linked follow-up tasks'),
    sections: [
      section('اختر طريقة الاجتماع', 'Choose how to meet', 'جدول اجتماعًا في مُعين، أو أضف رابطًا من Google Meet أو Microsoft Teams أو Zoom بعد ربط الحساب المناسب.', 'Schedule in Moeen or add a Google Meet, Microsoft Teams, or Zoom link after connecting the relevant account.'),
      section('تابع ما اتفقتم عليه', 'Follow through on decisions', 'أضف بنود المتابعة إلى لوحة الفريق وحدّد مسؤولًا لكل بند.', 'Add follow-ups to the team board and assign an owner to each one.'),
    ], related: ['tasks', 'integrations'],
  },
  mail: {
    path: '/product/mail/', label: pair('البريد', 'Mail'), teaser: pair('بريدك بجانب مهامك', 'Email alongside your tasks'),
    title: pair('تابع البريد من مكان العمل.', 'Follow up on email from your workspace.'),
    lead: pair('اربط حسابك في Gmail أو Outlook واقرأ الرسائل والردود من «البريد» في مُعين.', 'Connect Gmail or Outlook and read messages and replies in Moeen Mail.'),
    image: image('mod_mail', 1200, 750, 'رسالة بريد يتصل بها إجراء إنشاء مهمة', 'An email connected to a follow-up task'),
    sections: [
      section('اقرأ وردّ من مُعين', 'Read and reply in Moeen', 'افتح المحادثة البريدية بجانب عمل الفريق. تعتمد خيارات الحساب على الأذونات التي تمنحها عند الربط.', 'Open email threads alongside team work. Available account features depend on the permissions you grant.'),
      section('حوّل الرسالة إلى مهمة', 'Turn an email into a task', 'سجّل المتابعة على اللوحة وحدّد من يتولّاها ليبقى الطلب واضحًا للفريق.', 'Track the follow-up on the board and assign an owner so the team knows what’s next.'),
    ], related: ['tasks', 'integrations'],
  },
  architecture: {
    path: '/product/architecture/', label: pair('بنية مُعين الهجينة', 'Hybrid architecture'), teaser: pair('إجراءات وصلاحيات مشتركة للفريق والوكلاء', 'Shared actions and permissions'),
    title: pair('بنية واحدة لعمل الفريق والوكلاء.', 'One architecture for people and agents.'),
    lead: pair('يعمل الفريق والوكلاء على السجلات نفسها. ويمر كل إجراء بالصلاحيات والموافقات نفسها بحسب من ينفّذه وما يطلبه.', 'People and agents work on the same records. Each action follows the applicable permissions and approvals for the requester and the operation.'),
    image: image('app', 2080, 1300, 'قائمة المهام في مُعين بجانب طلب أنشأ منه ai-moeen مهمة في مساحة تجريبية', 'Moeen’s task list next to a task created by ai-moeen in a demo workspace'),
    sections: [
      section('إجراء واحد بأكثر من طريقة', 'One action with several ways to run it', 'يمكنك إنشاء المهمة من الواجهة أو تفويضها إلى ai-moeen. تُنفّذ طلبات الوكيل المتاحة عبر إجراءات مُعين نفسها.', 'Create a task in the interface or delegate it to ai-moeen. Supported agent requests run through the same Moeen actions.'),
      section('يظل القرار بيد الفريق', 'Keep decisions with your team', 'تنتظر الإجراءات التي تحتاج إلى موافقة قبل التنفيذ، ويبيّن سجل التدقيق من طلب الإجراء ومن نفّذه.', 'Actions that require approval wait before running, and the audit log records who requested and performed them.'),
      section('السياق من مساحة العمل', 'Context comes from the workspace', 'يرجع ai-moeen إلى ما تسمح به صلاحياتك من مستندات ومحادثات عند تفعيل قاعدة المعرفة في خطة برو.', 'With the Pro knowledge base, ai-moeen can use documents and conversations you’re allowed to access.'),
    ], related: ['ai_moeen', 'mcp', 'knowledge_base'],
  },
  ai_moeen: {
    path: '/ai/ai-moeen/', label: pair('ai-moeen', 'ai-moeen'), teaser: pair('من طلب مكتوب إلى إجراء', 'From a written request to an action'),
    title: pair('فوّض العمل من المحادثة نفسها.', 'Delegate from the conversation.'),
    lead: pair('اطلب من ai-moeen تلخيص نقاش أو إنشاء مهمة أو متابعة ما بقي على الفريق، بالعربية أو الإنجليزية.', 'Ask ai-moeen to summarize a discussion, create a task, or review what’s still open, in Arabic or English.'),
    image: image('ai_scene_response', 790, 450, 'رد تجريبي من ai-moeen يتضمّن ملخّصًا ومهمة جديدة', 'A demo ai-moeen reply with a summary and a new task'),
    sections: [
      section('أعطِ الوكيل سياق العمل', 'Give the agent enough context', 'ابدأ من محادثة خاصة أو اذكر ai-moeen في قناة. سمِّ المهمة أو الملف وحدّد النتيجة التي تحتاج إليها.', 'Start in a private conversation or mention ai-moeen in a channel. Name the task or file and describe the outcome you need.'),
      section('راجع الخطوات التي تحتاج إلى موافقة', 'Review actions that require approval', 'تُعرض تفاصيل الإجراء قبل تنفيذه إذا احتاج إلى موافقة، ويظهر التنفيذ في سجل التدقيق.', 'See the details before an action that requires approval runs, and find its execution in the audit log.'),
      section('الوصول في خطة برو', 'Available with Pro', 'يتطلب ai-moeen تفعيل خطة برو في مساحة العمل وإعداد مزوّد الذكاء الاصطناعي.', 'ai-moeen requires an active Pro workspace and a configured AI provider.'),
    ], related: ['architecture', 'knowledge_base', 'skills'],
  },
  mcp: {
    path: '/ai/mcp/', label: pair('MCP', 'MCP'), teaser: pair('أدوات المهام لوكلائك الخارجيين', 'Task tools for external agents'),
    title: pair('اربط وكيلك الخارجي بأدوات مُعين.', 'Connect an external agent to Moeen.'),
    lead: pair('يتيح MCP للعملاء المتوافقين استخدام أدوات المهام في مساحة العمل ضمن النطاق الذي يحدّده المالك.', 'MCP gives compatible clients access to workspace task tools within the scope set by the owner.'),
    sections: [
      section('حدّد نطاق كل اتصال', 'Set a scope for each connection', 'ينشئ مالك المساحة الاتصال من الإعدادات، ويختار ما يتيحه من قراءة وتعديل، ويمكنه إلغاؤه.', 'The workspace owner creates the connection in Settings, chooses its read and write access, and can revoke it.'),
      section('تابع الإجراءات المنفّذة', 'Track what runs', 'يُسجّل العمل باسم اتصال MCP، ويحتاج حذف المهام إلى موافقة شخص.', 'Actions are attributed to the MCP connection, and deleting tasks requires human approval.'),
    ], related: ['architecture', 'integrations'],
  },
  knowledge_base: {
    path: '/ai/knowledge-base/', label: pair('قاعدة المعرفة', 'Knowledge base'), teaser: pair('سياق العمل من مستنداتك', 'Work context from your documents'),
    title: pair('أجب عن أسئلة الفريق من مستنداته.', 'Answer team questions from the source.'),
    lead: pair('تتيح قاعدة المعرفة في خطة برو لـ ai-moeen البحث في المستندات التي يحق لك الوصول إليها.', 'The Pro knowledge base lets ai-moeen search documents you’re allowed to access.'),
    image: image('ai_scene_library', 1324, 900, 'مستندات الإطلاق في مكتبة مُعين', 'Launch documents in the Moeen library'),
    sections: [
      section('اسأل عن ملف أو موضوع', 'Ask about a file or topic', 'اذكر اسم المستند عند البحث عن تفاصيله. يمكن فهرسة ملفات مثل PDF وDOCX والملفات النصية المدعومة.', 'Name a document to ask about it. Supported PDFs, DOCX files, and text files can be indexed.'),
      section('تظل صلاحيات المصادر سارية', 'Source permissions still apply', 'يتحقّق مُعين من صلاحياتك قبل استرجاع النص، ويراعي سياق القناة عند مشاركة الإجابة.', 'Moeen checks access before retrieving text and accounts for the channel’s audience when sharing an answer.'),
    ], related: ['data', 'ai_moeen'],
  },
  skills: {
    path: '/ai/skills/', label: pair('المهارات', 'Skills'), teaser: pair('تعليمات تستخدمها في أكثر من طلب', 'Instructions you can reuse'),
    title: pair('اكتب طريقة العمل مرة واحدة.', 'Write your workflow instructions once.'),
    lead: pair('احفظ خطوات العمل المتكرر في مهارة، واخترها عند إرسال طلب إلى ai-moeen.', 'Save the steps for recurring work as a skill and select it when you send a request to ai-moeen.'),
    sections: [
      section('وضّح النتيجة التي تريدها', 'Describe the result you want', 'اكتب تعليمات مثل ترتيب ملخّص الاجتماع أو صيغة تسليم المهام. أضف أمثلة قصيرة إذا كانت تساعد.', 'Write instructions for work such as structuring a meeting summary or handing off a task. Add short examples where they help.'),
      section('اختر المهارة عند الحاجة', 'Choose a skill when it’s relevant', 'يمكنك اختيار أكثر من مهارة من محرّر ai-moeen. تظل صلاحيات الإجراءات والموافقات سارية عند استخدامها.', 'Select more than one skill from the ai-moeen composer. Action permissions and approvals still apply.'),
    ], related: ['ai_moeen', 'knowledge_base'],
  },
  integrations: {
    path: '/ai/integrations/', label: pair('التكاملات', 'Integrations'), teaser: pair('اربط بريدك وتقويمك وأدوات اجتماعاتك', 'Connect mail, calendars, and meeting tools'),
    title: pair('أبقِ أدواتك مرتبطة بمساحة العمل.', 'Keep your tools connected to the workspace.'),
    lead: pair('استخدم دليل التكاملات لمعرفة ما يتيحه كل تطبيق، ثم اربط الحسابات التي يحتاج إليها فريقك.', 'Use the integrations directory to see what each app supports, then connect the accounts your team needs.'),
    image: image('integrations', 1440, 1120, 'معاينة دليل التكاملات في مُعين', 'Moeen integrations directory in a demo workspace'),
    sections: [
      section('البريد والمواعيد', 'Mail and calendars', 'اربط Gmail أو Outlook للبريد، واعرض مواعيد التقاويم المدعومة في «الاجتماعات».', 'Connect Gmail or Outlook for email and see supported calendar events in Meetings.'),
      section('روابط الاجتماعات', 'Meeting links', 'أنشئ روابط الانضمام عبر Google Meet أو Microsoft Teams أو Zoom حسب الحساب والأذونات المتاحة.', 'Create join links with Google Meet, Microsoft Teams, or Zoom based on your connected account and permissions.'),
      section('راجع الإمكانات قبل الربط', 'Check what’s available before connecting', 'يعرض الدليل أمثلة على استخدام التطبيقات. افتح تفاصيل التكامل لمعرفة حالة الربط والخيارات المتاحة لحسابك.', 'The directory illustrates app workflows. Open an integration’s details to check its status and what’s available for your account.'),
    ], related: ['mail', 'meetings', 'mcp'],
  },
  about: {
    path: '/company/about/', label: pair('من نحن', 'About us'),
    title: pair('نبني مُعين ليعمل الفريق ووكلاؤه معًا.', 'We’re building Moeen for teams and their agents.'),
    lead: pair('مُعين مساحة عمل تبدأ بالعربية، وتجمع العمل اليومي وسياقه في مكان واحد.', 'Moeen is an Arabic-first workspace that keeps everyday work and its context together.'),
    sections: [
      section('لماذا بدأنا بمساحة العمل؟', 'Why we started with the workspace', 'عندما تكون المهام والمحادثات والملفات متجاورة، يستطيع الفريق متابعة العمل من المكان الذي بدأ فيه.', 'When tasks, conversations, and files sit together, the team can follow up where the work started.'),
      section('كيف يدخل الوكيل في العمل؟', 'How agents fit into the work', 'يعمل الوكيل ضمن الصلاحيات نفسها، وتبقى الموافقات جزءًا من الإجراءات التي تحتاج إلى مراجعة.', 'Agents work under the same permissions, and approvals remain part of actions that need review.'),
    ], related: ['architecture', 'roadmap', 'blog'],
  },
  affiliate: {
    path: '/company/affiliate/', label: pair('برنامج الإحالة', 'Affiliate program'),
    lead: pair('ستجد هنا شروط برنامج الإحالة وطريقة التقديم عند فتحه.', 'Program terms and application details will appear here when enrollment opens.'),
    related: ['about'],
  },
  support: {
    path: '/company/support/', label: pair('الدعم', 'Support'),
    lead: pair('اعثر على المساعدة التي تحتاج إليها للبدء أو العودة إلى مساحة عملك.', 'Find help getting started or getting back to your workspace.'),
    sections: [
      section('الدخول إلى مساحة العمل', 'Access your workspace', 'افتح صفحة الدخول من دعوة فريقك أو سجّل الدخول بالبريد المرتبط بحسابك.', 'Open the sign-in page from your team’s invitation or sign in with the email attached to your account.'),
      section('ربط حساب أو مراجعة الصلاحيات', 'Connect an account or check access', 'افتح قسم التكاملات لمعرفة خيارات الربط. ولتغيير صلاحيات مساحة العمل، راجع مالكها أو أحد مسؤوليها.', 'Open Integrations to see connection options. For workspace permission changes, reach out to its owner or an admin.'),
    ],
    links: [{ href: '/#faq', label: pair('الأسئلة الشائعة', 'Frequently asked questions') }, { href: '/#download', label: pair('تنزيل تطبيق سطح المكتب', 'Download the desktop app') }],
    related: ['changelog', 'integrations'],
  },
  join: {
    path: '/company/join-us/', label: pair('انضم إلينا', 'Join us'),
    title: pair('العمل مع فريق مُعين', 'Work with the Moeen team'),
    lead: pair('نبني أدوات عمل تبدأ بالعربية وتتيح للفِرق تفويض العمل لوكلائها مع بقاء القرار بيدها.', 'We build Arabic-first tools that let teams delegate work to agents while keeping decisions in their hands.'),
    sections: [section('الفرص الوظيفية', 'Open roles', 'سننشر الفرص المتاحة وطريقة التقديم هنا.', 'Open roles and application details will be posted here.')],
    related: ['about', 'roadmap'],
  },
  blog: {
    path: '/blog/', label: pair('المدوّنة', 'Blog'),
    lead: pair('أفكار عن تنظيم عمل الفرق وتفويضه، من واقع ما نبنيه في مُعين.', 'Notes on organizing and delegating team work, drawn from what we’re building in Moeen.'),
  },
  conversations_post: {
    path: '/blog/from-conversation-to-task/', label: pair('من نقاش الفريق إلى مهمة واضحة', 'From a team discussion to a clear task'),
    lead: pair('حين يتفق الفريق على خطوة تالية، سجّلها حيث يمكن لأصحابها متابعتها.', 'When the team agrees on a next step, record it where its owners can follow through.'),
    image: image('mod_chat', 1200, 750, 'محادثة في مُعين يتبعها إنشاء مهمة', 'A Moeen conversation followed by task creation'),
    sections: [
      section('ابدأ بالنتيجة المطلوبة', 'Start with the outcome', 'إذا اتفق الفريق على مراجعة صفحة قبل الإطلاق، اجعل عنوان المهمة يصف هذه المراجعة. أضف الرابط أو الملف الذي دار حوله النقاش وحدّد موعدها.', 'If the team agrees to review a page before launch, use a task title that describes the review. Add the link or file discussed and set the due date.'),
      section('حدّد من يتابعها', 'Name the owner', 'أنشئ المهمة من الرسالة أو فوّضها إلى ai-moeen. راجع الفريق والمسؤول والموعد، ثم تابع التقدّم من اللوحة.', 'Create the task from the message or delegate it to ai-moeen. Check the team, owner, and due date, then follow progress from the board.'),
    ], related: ['chat', 'tasks'],
  },
  approvals_post: {
    path: '/blog/when-agents-need-approval/', label: pair('متى يحتاج الوكيل إلى موافقة؟', 'When does an agent need approval?'),
    lead: pair('تفويض إجراء يوفّر وقتًا للفريق. وتساعد الموافقة على إبقاء القرارات الحساسة بيد أصحابها.', 'Delegation saves time. Approvals keep sensitive decisions with the people responsible for them.'),
    sections: [
      section('راجع الإجراء المقترح', 'Review the proposed action', 'إذا طلبت من ai-moeen حذف سجل أو تغيير صلاحيات الوصول، راجع السجل المعني ومن سيتأثر بالتغيير قبل الموافقة.', 'If you ask ai-moeen to delete a record or change access, review the affected record and people before approving.'),
      section('ارجع إلى سجل التدقيق', 'Check the audit log', 'بعد التنفيذ يمكنك الرجوع إلى السجل لمعرفة من طلب الإجراء ومن نفّذه. يستطيع المسؤول مراجعة متطلبات الموافقة في إعدادات المساحة.', 'After execution, the log shows who requested and performed the action. Admins can review approval requirements in workspace settings.'),
    ], related: ['architecture', 'ai_moeen'],
  },
  docs: { path: '/docs/', label: pair('التوثيق', 'Docs') },
};

export const blogPosts = ['conversations_post', 'approvals_post'];
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
