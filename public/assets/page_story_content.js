const pair = (ar, en) => ({ ar, en });
const point = (ar, en, bodyAr, bodyEn) => ({ title: pair(ar, en), body: pair(bodyAr, bodyEn) });
const shot = (name, width, height, ar, en) => ({ shot: name, width, height, alt: pair(ar, en) });
const block = (kind, title, items) => ({ kind, title, items });
const scene = (item, image) => ({ kind: 'scene', ...item, image });
const example = (title, ar, en, note) => ({ kind: 'example', title, quote: pair(ar, en), note });

const images = {
  task: shot('mod_tasks', 1200, 750, 'مهمة تظهر في مراحل مختلفة على لوحة مُعين', 'A task shown at different stages of the Moeen board'),
  chat: shot('mod_chat', 1200, 750, 'نقاش في قناة المنتج يتضمّن ردًا من AI', 'The product channel with a team discussion and an AI reply'),
  team: shot('setup_teams', 1424, 720, 'صفحة فريق تجريبي في مُعين', 'A demo team page in Moeen'),
  data: shot('workspace_data', 930, 670, 'مجلد الملفات الخاصة ومجلد ملفات مساحة العمل في مُعين', 'The private and workspace file folders in Moeen'),
  meeting: shot('workspace_meetings', 1338, 968, 'قائمة الاجتماعات المقبلة في مساحة عمل تجريبية', 'Upcoming meetings in a demo workspace'),
  mail: shot('mod_mail', 1200, 750, 'رسالة بريدية وبجانبها مهمة لمتابعتها', 'An email alongside its follow-up task'),
  audit: shot('audit', 1520, 960, 'سجل التدقيق في مساحة عمل تجريبية', 'The audit log in a demo workspace'),
  skills: shot('workspace_skills', 1788, 878, 'قائمة المهارات المفعّلة وغير المفعّلة في مساحة تجريبية', 'Enabled and disabled skills in a demo workspace'),
  workspace: shot('setup_company', 1000, 716, 'إعداد مساحة عمل تجريبية في مُعين', 'A demo workspace setup in Moeen'),
};

export const pageStories = {
  tasks: {
    blocks: [
      block('grid', pair('لوحة للفريق وقائمة لمراجعة التفاصيل', 'A board for the team, a list for the details'), [
        point('اللوحة', 'Board', 'شاهد المهام موزّعة حسب حالتها. انقل المهمة عند بدء العمل أو اكتماله لتبقى اللوحة مرجعًا للفريق.', 'See work grouped by status. Move a task as work starts or finishes so the board reflects where the team stands.'),
        point('القائمة', 'List', 'راجع المواعيد والأولويات على سطور متتالية. صفِّ النتائج لتجد مهامك أو عمل فريق معيّن.', 'Scan dates and priorities across rows. Filter the list to focus on your tasks or a specific team.'),
        point('تفاصيل المهمة', 'Task details', 'افتح المهمة لتراجع وصفها والمرفقات والتعليقات. يستطيع من يتسلّمها الرجوع إلى السياق من المكان نفسه.', 'Open a task to see its description, attachments, and comments. Whoever picks it up can get the context in one place.'),
      ]),
      scene(point('راجع كل بند قبل الإطلاق', 'Work through a launch review', 'أنشئ مهمة لمراجعة شاشة الترحيب، وأضف رابط التصميم، وحدّد المسؤول والموعد. ناقش التعديلات داخل المهمة، ثم حدّث حالتها بعد المراجعة.', 'Create a task to review the welcome screen, link the design, and set an owner and date. Discuss changes on the task and update its status after review.'), images.task),
      block('faq', pair('من يتابع المهام في الفريق؟', 'Who follows up?'), [
        point('كيف أعرف ما أُسند إليّ؟', 'How do I find work assigned to me?', 'افتح «مهامي» لتراجع ما أُسند إليك، أو صفِّ القائمة بحسب المسؤول لتراجع توزيع العمل.', 'Open My tasks to review your assignments, or filter by assignee to see how work is distributed.'),
        point('هل أستطيع متابعة العمل حسب الفريق؟', 'Can I review work by team?', 'نعم. اختر الفريق من التصفية أو افتح تبويب المهام في صفحته.', 'Yes. Filter by team or open the Tasks tab on that team’s page.'),
      ]),
    ],
  },
  chat: {
    blocks: [
      scene(point('من رسالة إلى مهمة يتابعها الفريق', 'From a channel message to a task', 'إذا اتفق الفريق على مراجعة صفحة قبل النشر، سجّل ما اتفقتم عليه في مهمة، أو اذكر AI في القناة ووضّح ما تريد متابعته. راجع إسناد المهمة وموعدها بعد إنشائها.', 'When the team agrees to review a page before publication, record what you agreed on as a task, or mention AI in the channel with the details. Check the owner and due date once the task is created.'), images.chat),
      block('rows', pair('اختر المكان المناسب للنقاش', 'Choose where to talk'), [
        point('القناة', 'Channel', 'شارك التحديثات التي يحتاج الفريق إلى قراءتها. ثبّت قرارًا أو رابطًا يعود إليه الأعضاء لاحقًا.', 'Share updates the team needs to see. Pin a decision or link that members will need again.'),
        point('الرسائل المباشرة', 'Direct messages', 'اسأل زميلًا عن تفصيل أو راجع معه عملًا قبل عرضه على الفريق.', 'Ask a teammate about a detail or review something together before sharing it with the team.'),
        point('المكالمات', 'Calls', 'إذا احتاج النقاش إلى حديث مباشر، افتح مكالمة من القناة. اكتب ما اتفقتم عليه في القناة بعد انتهائها.', 'Start a call from the channel when a discussion needs a conversation. Post what you agreed on in the channel afterward.'),
      ]),
    ],
  },
  teams: {
    blocks: [
      block('steps', pair('ثلاث خطوات لتجهيز الفريق', 'Set up the team for its first project'), [
        point('اكتب نبذة', 'Write a brief', 'اذكر ما يتولّاه الفريق وما يحتاج الأعضاء إلى معرفته عند الانضمام.', 'Describe what the team owns and what a new member should know.'),
        point('أضف الأعضاء واربط القناة', 'Add members and link the channel', 'أنشئ قناة من صفحة الفريق لتضم أعضاءه، أو اختر قناة قائمة وراجع أعضاءها من إعداداتها.', 'Create a channel from the team page to include the team’s members, or link an existing channel and review its membership in channel settings.'),
        point('اجمع المهام والملفات', 'Bring in tasks and files', 'استخدم تبويبات الفريق لمراجعة العمل الجاري والملفات التي يحتاج الأعضاء إلى الرجوع إليها.', 'Use the team tabs to review work in progress and find the files people keep coming back to.'),
      ]),
      scene(point('اعرف أين تبدأ في كل فريق', 'Give new teammates a starting point', 'يستطيع العضو الجديد قراءة النبذة، ثم فتح المهام والقناة من صفحة الفريق نفسها. وإذا تغيّرت عضوية الفريق، تتبعها القناة التي أُنشئت له.', 'A new teammate can read the brief, then open tasks and chat from the same team page. Membership changes also carry over to a channel created for that team.'), images.team),
    ],
  },
  data: {
    image: images.data,
    blocks: [
      scene(point('ملفاتك وملفات مساحة العمل', 'Private and workspace files', 'ابدأ من المجلد المناسب، وراجع صلاحياته قبل نقل ملف أو مشاركته. يمكنك معاينة الملف أو تنزيله، وتغيير الاسم أو المكان عندما تسمح صلاحياتك بذلك.', 'Start in the right folder and review its access before moving or sharing anything. Preview or download files, and rename or move them when your permissions allow it.'), shot('ai_scene_library', 1324, 900, 'ملفات في مجلد عمل داخل مُعين', 'Files in a work folder in Moeen')),
      block('rows', pair('كيف تجد الملف مرة أخرى؟', 'How do you find a file again?'), [
        point('من المجلد', 'From a folder', 'استعرض المجلدات في «المستكشف»، أو اختر القائمة لمراجعة أسماء الملفات، أو الشبكة لمعاينة ما تبحث عنه.', 'Browse folders in Explorer, scan filenames in List view, or use Grid view to recognize what you’re looking for.'),
        point('من القناة أو الفريق', 'From a channel or team', 'تظهر مرفقات القناة في مجلد باسمها في «البيانات»، وتظهر أيضًا في تبويب «البيانات» للفريق المرتبط بها. يظل الملف خاضعًا لصلاحيات القناة.', 'Channel attachments appear in a folder named for the channel and in the linked team’s Data tab. The channel’s permissions still control access.'),
        point('من سؤال إلى AI', 'From a question to AI', 'عند تفعيل قاعدة المعرفة في خطة برو، يمكنك طلب تفصيل من ملف مفهرس تملك صلاحية قراءته.', 'With the Pro knowledge base enabled, you can ask about details in an indexed file you’re allowed to read.'),
      ]),
    ],
  },
  meetings: {
    image: images.meeting,
    blocks: [
      block('timeline', pair('من التحضير إلى متابعة القرارات', 'Before, during, and after the meeting'), [
        point('قبل الموعد', 'Before the meeting', 'حدّد المشاركين والوقت. اختر تقويمًا متصلًا تملك صلاحية الكتابة فيه إذا أردت جدولة الموعد من خلاله.', 'Pick the participants and time. Choose a connected calendar you can write to if you want to schedule through it.'),
        point('أثناء الاجتماع', 'During the meeting', 'افتح رابط الانضمام من تفاصيل الموعد. سجّل القرارات التي تحتاج إلى متابعة وحدّد مع الفريق من يتولّاها.', 'Open the join link from the event details. Note the decisions that need follow-up and agree who will own them.'),
        point('بعد الاجتماع', 'After the meeting', 'أنشئ مهمة لكل بند يحتاج إلى تنفيذ، وأضف المسؤول والموعد حتى يستطيع الفريق متابعته من اللوحة.', 'Create a task for each item that needs work and include an owner and due date so the team can track it on the board.'),
      ]),
      scene(point('تابع ما بعد اجتماع الإطلاق', 'Follow up on a launch meeting', 'إذا قرّر الفريق اختبار نموذج التسجيل ومراجعة صفحة الأسعار، سجّل كل بند على حدة. يستطيع الفريق متابعة تقدّمهما حتى موعد الإطلاق.', 'If the team decides to test signup and review pricing, track them as separate tasks. The team can see how both are progressing before launch.'), shot('mod_meetings', 1200, 750, 'اجتماع تجريبي تتفرّع منه مهام متابعة', 'A demo meeting with linked follow-up tasks')),
      block('faq', pair('اربط تقويمك قبل جدولة اللقاءات', 'Connect a calendar before scheduling'), [
        point('ما الحساب الذي أحتاج إلى ربطه؟', 'Which account do I connect?', 'استخدم Google Calendar أو تقويم Outlook للمواعيد. تتوفّر روابط Google Meet وMicrosoft Teams بحسب التقويم والأذونات. يحتاج Zoom إلى حساب Zoom متصل.', 'Use Google Calendar or Outlook Calendar for events. Google Meet and Microsoft Teams links depend on the calendar and its permissions. Zoom requires a connected Zoom account.'),
      ]),
    ],
  },
  mail: {
    image: shot('mail', 1200, 800, 'رسالة مفتوحة في بريد مُعين', 'An open message in Moeen Mail'),
    blocks: [
      block('grid', pair('من البريد الوارد إلى مهام الفريق', 'From inbox to follow-up'), [
        point('اعثر على الرسالة', 'Find the message', 'ابحث في البريد المتصل أو تصفّح مجلدات حسابك. افتح المحادثة لمراجعة الرسائل السابقة قبل الرد.', 'Search connected mail or browse the account folders. Open the thread to review previous replies before you respond.'),
        point('راجع قبل الإرسال', 'Review before sending', 'اكتب ردّك أو احفظه مسوّدة. راجع المستلمين والمرفقات من الحساب الذي ستُرسل منه.', 'Write a reply or save a draft. Check the recipients and attachments on the account you’re sending from.'),
        point('احتفظ بما يحتاج متابعة', 'Keep track of follow-ups', 'إذا طلبت الرسالة شيئًا سيتولّاه الفريق، سجّل المطلوب في مهمة وأسنِدها لمن يتابعها.', 'If the email calls for work from the team, record the request as a task and assign someone to follow up.'),
      ]),
      scene(point('تابع ملاحظات العميل مع الفريق', 'Track customer feedback on the board', 'بعد وصول ملاحظات على عرض، أنشئ مهمة لمراجعتها. لخّص ما يحتاج الفريق إلى فعله، وحدّد موعدًا للرد. شارك المرفقات مع من يحتاج إليها بحسب صلاحياتها.', 'When feedback arrives on a proposal, create a review task. Summarize what the team needs to do and agree on a reply date. Share attachments with the people who need them, subject to access.'), images.mail),
    ],
  },
  architecture: {
    image: null,
    blocks: [
      block('pipeline', pair('كيف ينتقل الطلب من النية إلى التنفيذ في مُعين؟', 'What happens between the request and the result?'), [
        point('طلب من الواجهة أو الوكيل', 'Request from a person or agent', 'مثل إنشاء مهمة من اللوحة أو تفويضها إلى AI.', 'For example, create a task from the board or delegate it to AI.'),
        point('إجراء مشترك', 'Shared action', 'يحدّد مُعين الإجراء ويتحقّق من وصول من طلبه إلى السجل.', 'Moeen resolves the action and checks the requester’s access to the record.'),
        point('موافقة عند الحاجة', 'Approval where required', 'يعرض مُعين تفاصيل الإجراءات التي تنتظر قرار شخص قبل التنفيذ.', 'Moeen shows the details of actions that need a person’s decision before they run.'),
        point('نتيجة وسجل تدقيق', 'Result and audit record', 'تظهر النتيجة على السجل، ويمكن معرفة من طلب الإجراء ومن نفّذه.', 'The result appears on the record, with attribution for who requested and performed it.'),
      ]),
      scene(point('ما الذي يرجع إليه وكيلك؟', 'Where does the agent get its context?', 'إذا طلبت إنشاء مهمة من نقاش، يمكن أن يستفيد الوكيل من سياق المحادثة المتاح له. وتضيف قاعدة المعرفة في خطة برو البحث في المستندات المسموح بقراءتها.', 'When you ask for a task from a discussion, the agent can use the conversation context available to it. The Pro knowledge base adds search across documents you’re allowed to read.'), shot('app', 2080, 1300, 'قائمة مهام بجانب طلب أنشأ منه AI مهمة في مساحة تجريبية', 'A task list next to a task created by AI in a demo workspace')),
      scene(point('يمكنك مراجعة ما حدث', 'Review what happened', 'يعرف المسؤول من نفّذ الإجراء بالرجوع إلى سجل التدقيق. وتبقى الموافقات نافذة عند استخدام واجهة مختلفة أو اتصال MCP ضمن نطاقه.', 'An administrator can check who performed an action in the audit log. Approval requirements continue to apply across surfaces, including scoped MCP connections.'), images.audit),
    ],
  },
  ai_moeen: {
    blocks: [
      example(pair('ابدأ بطلب يحدّد النتيجة', 'Start with the outcome you want'), 'راجع مهام إطلاق التطبيق. ما الذي بقي؟ أنشئ مهمة لمراجعة شاشة الترحيب وأسنِدها إلى سارة.', 'Review the app launch tasks. What’s still open? Create a task to review the welcome screen and assign it to Sara.', pair('مثال لطلب يمكن كتابته في محادثة خاصة.', 'An example request for a private AI conversation.')),
      block('grid', pair('ماذا يمكنك أن تفوّض؟', 'What can you delegate?'), [
        point('راجع عمل الفريق', 'Review team work', 'اسأل عن المهام المفتوحة أو لخّص ما اتفق عليه الفريق من محادثة متاحة لك.', 'Ask about open tasks or summarize what a team agreed to in a conversation you can access.'),
        point('أنشئ متابعة', 'Create a follow-up', 'سمِّ الفريق والمسؤول، واذكر الموعد إن كان معروفًا. راجع نتيجة التنفيذ في المحادثة.', 'Name the team and owner, and include the due date if you have one. Review the result in the conversation.'),
        point('أعد استخدام تعليمات الفريق', 'Use your team’s instructions', 'اختر مهارة لإضافة صيغة الملخّص أو طريقة العمل التي يتّبعها فريقك إلى الطلب.', 'Select a skill to add your team’s summary format or working instructions to the request.'),
      ]),
      block('faq', pair('التوفّر والصلاحيات', 'Access and availability'), [
        point('متى أراجع الإجراء قبل تنفيذه؟', 'When do I review an action before it runs?', 'يعرض مُعين الإجراءات التي تحتاج إلى موافقة، مثل الحذف أو تغيير صلاحية المشاركة، حتى تراجع طلبك أولًا.', 'Moeen shows actions that need your approval, such as deletion or a change to sharing access, so you can review your request first.'),
        point('كيف يتوفّر AI؟', 'How do I get access to AI?', 'تحتاج مساحة العمل إلى خطة برو مفعّلة وإعداد مزوّد الذكاء الاصطناعي.', 'The workspace needs an active Pro plan and a configured AI provider.'),
      ]),
    ],
  },
  mcp: {
    blocks: [
      {
        kind: 'matrix', title: pair('لكل اتصال نطاق من الصلاحيات', 'Every connection has its scopes'),
        headings: [pair('الصلاحية', 'Scope'), pair('ما الذي تتيحه؟', 'What it allows')],
        rows: [
          [{ code: 'tasks:read' }, pair('عرض المهام التي يسمح بها الاتصال.', 'List tasks the connection is permitted to read.')],
          [{ code: 'tasks:write' }, pair('إنشاء المهام أو تعديلها ضمن نطاق الاتصال. يحتاج الحذف إلى موافقة داخل مُعين.', 'Create or update tasks within the connection’s scope. Deletion requires approval in Moeen.')],
        ],
      },
      block('steps', pair('أعدّ الاتصال من مساحة عملك', 'Set up a workspace connection'), [
        point('أنشئ اتصالًا من الإعدادات', 'Create a connection in Settings', 'يفتح المالك أو المشرف المخوّل صفحة MCP ويختار الصلاحيات المناسبة لاستخدام العميل.', 'An owner or authorized admin opens MCP settings and chooses the scopes the client needs.'),
        point('أضف الإعداد إلى العميل', 'Add the configuration to the client', 'احفظ الإعداد الذي يعرضه مُعين مرة واحدة. استخدم رابط مساحة العمل وترويسة المصادقة في عميل يدعم Streamable HTTP.', 'Save the one-time configuration shown in Moeen. Use the workspace URL and authorization header in a client that supports Streamable HTTP.'),
        point('راجع الاتصال عند تغيّر الحاجة', 'Review the connection over time', 'راجع ما نفّذه الاتصال في سجل التدقيق، وألغِ بيانات اعتماده من قائمة الاتصالات عند انتهاء الحاجة إليه.', 'Check what the connection performed in the audit log and revoke its credential when you no longer need it.'),
      ]),
      block('faq', pair('الموافقة على طلبات الحذف', 'Approving task deletion'), [
        point('ماذا يحدث عندما يطلب العميل حذف مهمة؟', 'What happens when the client requests a task deletion?', 'راجع الطلب في مُعين. بعد الموافقة، يعيد العميل إرسال الطلب نفسه مع معرّف الموافقة.', 'Review the request in Moeen. After approval, the client retries the same request with its approval ID.'),
      ]),
    ],
  },
  knowledge_base: {
    blocks: [
      example(pair('اطلب تفصيلًا من مستند تعرفه', 'Ask for a detail from a document you know'), 'ما شروط قبول التصدير في ملف متطلبات الشحن؟', 'What are the export acceptance criteria in the shipment requirements file?', pair('ذكر اسم الملف يحصر البحث في المستندات المطابقة التي يمكنك قراءتها.', 'Naming the file narrows retrieval to matching documents you can access.')),
      block('rows', pair('من رفع الملف إلى إجابة للفريق', 'From upload to an answer you can share'), [
        point('تُفهرس الملفات المدعومة', 'Supported files are indexed', 'تبحث قاعدة المعرفة في ملفات PDF وDOCX وXLSX وCSV وملفات النص وJSON وMarkdown المدعومة بعد فهرستها. تحتاج ملفات PDF الممسوحة إلى نص قابل للاستخراج.', 'The knowledge base can search supported PDF, DOCX, XLSX, CSV, text, JSON, and Markdown files after indexing. Scanned PDFs need extractable text.'),
        point('يراعي البحث صلاحياتك', 'Retrieval checks your access', 'يبحث AI في المحادثة الخاصة ضمن المستندات والمحادثات التي يمكنك الرجوع إليها. إذا تعذّر الوصول إلى ملف سمّيته، يبقى البحث محصورًا في الملف المطلوب.', 'In private chat, AI searches documents and conversations you can access. If a named file is unavailable, the search stays scoped to that file.'),
        point('يراعي النشر أعضاء القناة', 'Sharing checks the channel audience', 'يتحقّق مُعين من صلاحيات من سيرى الرد. مشاركة رابط ملف خاص لا تمنح أعضاء القناة حق قراءته.', 'Moeen checks access for the people who will see the reply. Sharing a private file link does not give channel members access to it.'),
      ]),
    ],
  },
  skills: {
    blocks: [
      example(pair('مثال على مهارة لتلخيص اجتماع', 'Example skill for a meeting recap'), 'ابدأ بالقرارات. ثم اذكر بنود العمل ومسؤول كل بند وموعده إن اتفقنا عليه. اختم بالأسئلة التي بقيت مفتوحة.', 'Start with the decisions. Then list the action items, each owner, and the due date if one was agreed. End with the questions still open.', pair('احفظ تعليمات العمل المتكرر باسم يسهل تذكّره، مثل «ملخّص الاجتماع».', 'Save recurring instructions under a recognizable name, such as “Meeting recap.”')),
      scene(point('اختر التعليمات مع كل طلب', 'Choose instructions for each request', 'يمكنك بدء طلب من قائمة المهارات، أو اختيار أكثر من مهارة في محرّر AI. اكتب بعدها ما تريد إنجازه في هذه المرّة.', 'Start a request from the skills list or select multiple skills in the AI composer. Then describe what you want to get done this time.'), images.skills),
      block('rows', pair('متى تستخدم المهارات؟', 'When is a skill useful?'), [
        point('عند تكرار الصيغة', 'For a recurring format', 'استخدم مهارة حين تريد الصيغة نفسها في ملخّص الاجتماع أو مراجعة المهام الأسبوعية.', 'Use a skill when a meeting recap or weekly task review needs the same format each time.'),
        point('عند تغيّر طريقة العمل', 'When the workflow changes', 'حدّث التعليمات أو عطّل المهارة إذا لم تعد مناسبة. تظل الإجراءات خاضعة للصلاحيات والموافقات المعتادة.', 'Update the instructions or disable the skill if it’s no longer useful. Actions still follow the usual permissions and approvals.'),
      ]),
    ],
  },
  integrations: {
    blocks: [
      block('providers', pair('اختر التطبيق بحسب ما تحتاج إليه', 'Choose the app for the work you need'), [
        { logo: 'gmail', ...point('Gmail', 'Gmail', 'اقرأ المحادثات البريدية واكتب الردود من بريد مُعين بعد ربط الحساب.', 'Read threads and write replies in Moeen Mail after connecting your account.') },
        { logo: 'outlook', ...point('Outlook', 'Outlook', 'اربط بريد Outlook، أو اعرض مواعيد التقويم وجدول اجتماعات من التقاويم التي يمكنك تعديلها.', 'Connect Outlook Mail, or view calendar events and schedule on calendars you can edit.') },
        { logo: 'google_calendar', ...point('Google Calendar', 'Google Calendar', 'اعرض مواعيدك واختر تقويمًا للجدولة. يتوفّر رابط Google Meet إذا أتاحه التقويم.', 'View events and choose a scheduling calendar. Google Meet links are available when the calendar allows them.') },
        { logo: 'zoom', ...point('Zoom', 'Zoom', 'أنشئ رابط Zoom لاجتماع بعد ربط حساب يسمح بإنشاء الاجتماعات.', 'Create a Zoom meeting link after connecting an account with meeting creation access.') },
      ]),
      block('steps', pair('من الدليل إلى ربط الحساب', 'From the directory to a connected account'), [
        point('افتح تفاصيل التطبيق', 'Open the app details', 'راجع الاستخدامات الموضّحة وحالة الربط الحالية قبل أن تبدأ.', 'Check the listed use cases and the current connection status before you start.'),
        point('راجع ما يطلبه مزوّد الخدمة', 'Review the provider’s permissions', 'اختر الحساب وراجع الأذونات التي يحتاج إليها الاستخدام الذي تريده.', 'Choose the account and review the permissions needed for the workflow you want.'),
        point('ارجع إلى مكان العمل', 'Return to the workspace', 'افتح البريد أو الاجتماعات لاستخدام الحساب المرتبط. تتوقّف بعض الخيارات على الأذونات التي منحها المزوّد.', 'Open Mail or Meetings to use the connected account. Some options depend on permissions the provider granted.'),
      ]),
    ],
  },
  about: {
    blocks: [
      block('prose', pair('ما الذي نحاول تغييره في يوم عملك؟', 'What are we trying to change about the workday?'), [
        point('من النقاش إلى التنفيذ', 'From discussion to follow-through', 'كثير من العمل يبدأ برسالة أو اجتماع وينتهي عند شخص يحتاج إلى معرفة ما عليه. نبني مُعين ليبقى القرار قريبًا من المهمة والملفات التي يحتاجها من سينفّذها.', 'A lot of work starts in a message or meeting and ends up with someone who needs to know what to do. We build Moeen so the decision stays close to the task and the files the owner will need.'),
        point('العربية في تفاصيل العمل', 'Arabic in everyday work', 'تبدأ واجهة مُعين بالعربية، وتدعم الإنجليزية أيضًا. يمكن لأعضاء الفريق استخدام اللغة المناسبة لهم وهم يعملون على المهام والمحادثات نفسها.', 'Moeen starts with Arabic and also supports English. Teammates can use the language that works for them while sharing the same tasks and conversations.'),
      ]),
      scene(point('فريق بشري ووكيل يتشاركان السجلات', 'People and agents work on the same records', 'تجمع البنية الهجينة بين العمل من الواجهة وتفويضه إلى الوكيل. تبقى الصلاحيات والموافقات جزءًا من الإجراء، ويمكن للمسؤول مراجعة التنفيذ.', 'The hybrid architecture supports work from the interface and delegation to an agent. Permissions and approvals stay with the action, and administrators can review its execution.'), images.workspace),
    ],
  },
  affiliate: {
    blocks: [
      block('rows', pair('هل يناسب البرنامج عملك؟', 'Who might the program suit?'), [
        point('من يساعد الفرق على اختيار أدواتها', 'People who help teams choose tools', 'إذا كنت تساعد فرقًا على ترتيب المحادثات والمهام والملفات، تعرّف على طريقة جمعها في مُعين قبل التوصية به.', 'If you help teams organize their chat, tasks, and files, see how Moeen brings them together before recommending it.'),
        point('من يشرح أدوات العمل لجمهوره', 'People who explain work tools', 'يمكنك الاطّلاع على صفحات المنتج والأسعار لمعرفة الميزات المتاحة وما يحتاج إلى حساب أو خطة محدّدة.', 'Use the product and pricing pages to understand what’s available and what requires a connected account or a particular plan.'),
      ]),
      block('faq', pair('الشروط وتقديم الطلبات', 'Applications and terms'), [
        point('هل باب التقديم مفتوح؟', 'Are applications open?', 'سننشر طريقة التقديم هنا عند فتح البرنامج.', 'We’ll publish application details here when the program opens.'),
        point('أين أجد تفاصيل العمولة؟', 'Where will commission details be listed?', 'ستُنشر العمولة وشروطها في هذه الصفحة.', 'They’ll be published with the program terms when available.'),
      ]),
    ],
  },
  support: {
    blocks: [
      {
        kind: 'resources', title: pair('بمَ نساعدك؟', 'What do you need help with?'),
        items: [
          { href: 'https://app.moeen.dev/', ...point('الدخول إلى مساحة العمل', 'Access your workspace', 'سجّل الدخول بالبريد الذي استقبل دعوة فريقك. اطلب من مسؤول المساحة مراجعة الدعوة إذا تعذّر فتحها.', 'Sign in with the email that received your team’s invitation. If the invite won’t open, ask the workspace admin to check it.') },
          { href: '/#download', ...point('تنزيل التطبيق', 'Download the app', 'اختر نسخة سطح المكتب المناسبة لجهازك من صفحة التنزيل.', 'Choose the desktop build for your device from the downloads section.') },
          { href: '/ai/integrations/', ...point('ربط البريد أو التقويم', 'Connect mail or a calendar', 'تحقّق من الحساب والأذونات المطلوبة للتكامل الذي تريد ربطه.', 'Check the account and provider permissions required for the integration you want.') },
          { href: '/#faq', ...point('أسئلة عن النسخة التجريبية', 'Questions about the beta', 'راجع تفاصيل البدء والحساب واستضافة البيانات.', 'Look up how to get started, account details, and where data is hosted.') },
        ],
      },
      block('faq', pair('الوصول والصلاحيات', 'Access and permissions'), [
        point('لماذا لا يظهر لي ملف شاركه زميلي؟', 'Why can’t I open a file a teammate shared?', 'تحقّق من مساحة العمل التي فتحتها، واطلب من صاحب الملف مراجعة صلاحيات المجلد أو القناة التي أُرفق بها.', 'Check which workspace you’re in and ask the owner to review access to the folder or the channel where it was attached.'),
        point('أين أراجع ما تغيّر في الإصدار؟', 'Where do I see what changed in a release?', 'يعرض سجل التحديثات الميزات والتحسينات والإصلاحات لكل إصدار منشور.', 'The changelog lists new features, improvements, and fixes for each published release.'),
      ]),
    ],
  },
  join: {
    blocks: [
      block('prose', pair('ما الذي نبنيه الآن؟', 'What are we building now?'), [
        point('مساحة عمل تبدأ بالعربية', 'An Arabic-first workspace', 'نهتم بوضوح الواجهة والكتابة في المحادثات والمهام، ونعمل على أن يبقى الاستخدام طبيعيًا عند تبديل اللغة واتجاهها.', 'We care about clear interfaces and writing in chat and tasks, and about making the workspace feel natural when the language and direction change.'),
        point('وكلاء يمكن متابعة عملهم', 'Agents whose work you can follow', 'نبني طرقًا لتفويض العمل ومراجعة الإجراءات ونتائجها من السجلات التي يستخدمها الفريق كل يوم.', 'We’re building ways to delegate work and review actions and their results on the records teams already use.'),
      ]),
      block('notice', pair('فرص التوظيف', 'Open roles'), [
        point('سنعلن الفرص هنا', 'We’ll announce openings here', 'عند نشر فرصة، ستجد تفاصيل الدور وطريقة التقديم في هذه الصفحة.', 'When a role opens, this page will include the role details and how to apply.'),
      ]),
    ],
  },
  conversations_post: {
    blocks: [
      block('prose', pair('قبل أن تغلق النقاش', 'Before the discussion ends'), [
        point('اتفقوا على ما يعنيه الإنجاز', 'Agree on what done means', 'إذا وصلتكم ملاحظات على صفحة الأسعار، حدّدوا ما الذي يحتاج إلى مراجعة. قد يكون المطلوب تدقيق الأرقام أو تعديل شرح الخطة أو مراجعة النسخة العربية. اذكروا المطلوب في عنوان المهمة.', 'If feedback arrives on a pricing page, agree on what needs checking. It might be the numbers, the plan description, or the Arabic copy. Put that outcome in the task title.'),
        point('اجمع ما يحتاج إليه من سيتابع', 'Give the owner what they need', 'أضف رابط الصفحة وملف الملاحظات وحدّد المسؤول وموعد المراجعة. إذا كان القرار موزّعًا على رسائل عدة، لخّصه في وصف المهمة.', 'Add the page link and the notes, then set an owner and a review date. If the decision spans several messages, summarize it in the task description.'),
        point('أعد النتيجة إلى النقاش', 'Bring the result back to the discussion', 'بعد المراجعة، حدّث حالة المهمة وشارك النتيجة في القناة. سيجد من يعود إلى النقاش القرار والمتابعة في مكانهما.', 'After review, update the task status and share the result in the channel. Anyone returning to the discussion can see what was decided and how it turned out.'),
      ]),
      example(pair('صيغة تستخدمها مع الفريق', 'A format you can use'), 'راجعي أرقام صفحة الأسعار قبل النشر. قارنيها بالملف المرفق وضعي ملاحظاتك على المهمة قبل الخميس.', 'Review the pricing figures before publication. Compare them with the attached file and leave your notes on the task by Thursday.'),
    ],
  },
  approvals_post: {
    image: null,
    blocks: [
      block('prose', pair('قرار صغير قد يغيّر ما يراه الفريق', 'A small decision can change what a team sees'), [
        point('اقرأ الطلب من جهة من سيتأثر به', 'Read the request from the affected person’s perspective', 'إذا اقترح الوكيل نقل مجلد، راجع المجلد المقصود ومن يستطيع فتحه في وجهته الجديدة. وإذا طلب حذف مهمة، راجع المهمة نفسها قبل الموافقة.', 'If an agent proposes moving a folder, check which folder it means and who can access it at the destination. If it requests a deletion, review the task before approving.'),
        point('عدّل الطلب إن تغيّر القرار', 'Update the request when the decision changes', 'قد تكتشف أن العمل المطلوب يخصّ ملفًا واحدًا. ارفض الطلب الأول واطلب من الوكيل التعامل مع الملف المقصود فقط.', 'You may find the work only concerns one file. Reject the first request and ask the agent to act on the specific file.'),
        point('تحقّق من النتيجة', 'Check the result', 'بعد الموافقة والتنفيذ، افتح السجل الذي تغيّر أو ارجع إلى سجل التدقيق إذا كانت لديك صلاحية مراجعته.', 'After approval and execution, open the record that changed or check the audit log if you have access.'),
      ]),
      scene(point('سجل تعود إليه متى احتجت', 'A record you can return to', 'يبيّن السجل من طلب الإجراء ومن نفّذه. يساعد ذلك عند مراجعة قرار بعد انتهاء المحادثة.', 'The log records who requested and performed the action. That helps when reviewing a decision after the conversation is over.'), images.audit),
    ],
  },
  meetings_post: {
    blocks: [
      block('timeline', pair('تبدأ المتابعة حين ينتهي النقاش', 'The end of the meeting starts the follow-up'), [
        point('سمِّ القرار', 'Name the decision', 'قبل المغادرة، اتفقوا على ما تقرّر فعله. في اجتماع إطلاق مثلاً، قد يقرّر الفريق اختبار التسجيل قبل دعوة المستخدمين.', 'Before leaving, agree on what you’re doing. In a launch meeting, the team might decide to test signup before inviting users.'),
        point('اكتب كل متابعة في مهمة', 'Give each follow-up a task', 'اجعل لكل مهمة مسؤولًا وموعدًا. افصل مراجعة نص رسالة الدعوة عن اختبار التسجيل حتى يمكن متابعة تقدم كل بند.', 'Give each task an owner and date. Track invitation copy review separately from the signup test so each item can progress on its own.'),
        point('راجع البنود قبل الموعد التالي', 'Review the work before the next meeting', 'افتح اللوحة قبل الاجتماع التالي واسأل عما لا يزال عالقًا. خصّص وقت النقاش للقرارات التي تحتاج إلى الفريق الآن.', 'Open the board before the next meeting and check what’s still blocked. Save discussion time for the decisions that need the team now.'),
      ]),
      scene(point('ما الذي ينتظر متابعتك؟', 'What needs follow-up?', 'تساعدك مهمة مكتوبة بوضوح على استئناف العمل بعد الاجتماع ومعرفة من يتولّاه.', 'A clear task helps you pick up the work after the meeting and see who owns it.'), images.task),
    ],
  },
};
