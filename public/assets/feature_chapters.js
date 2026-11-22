// Editorial examples are local to the website. They never perform workspace actions.
const heading = (title, paragraph) => `<header><h2>${title}</h2><p>${paragraph}</p></header>`;
const note = (title, paragraph) => `<div><h3>${title}</h3><p>${paragraph}</p></div>`;
const disclosure = (title, body, open = false) => `<details${open ? ' open' : ''}><summary>${title}</summary><p>${body}</p></details>`;
const caption = text => `<figcaption>${text}</figcaption>`;

export const featureChapters = {
  tasks(t) {
    return [
      `<section class="edition task-spec">${heading(t('ماذا يحتاج من سيتسلّم المهمة؟','What does the next owner need?'),t('في هذا المثال، وصلت ملاحظة عن شاشة الترحيب قبل الإطلاق. سجّل العمل المطلوب بحيث يستطيع زميل لم يحضر النقاش أن يبدأ به.','In this example, feedback on the welcome screen arrives just before launch. Write the task so someone who missed the discussion can pick it up.'))}
      <article><h3>${t('مراجعة نص زر التسجيل','Review the signup button copy')}</h3><dl>
      <dt>${t('النتيجة المطلوبة','Outcome')}</dt><dd>${t('راجع نص الزر في النسختين العربية والإنجليزية. أرفق لقطة لكل نسخة بعد المراجعة.','Review the button in Arabic and English. Attach a screenshot of each version once reviewed.')}</dd>
      <dt>${t('المسؤول','Owner')}</dt><dd>${t('ريم تراجع النص، وسارة تتحقّق من ظهوره على الهاتف.','Reem reviews the wording. Sara checks how it fits on mobile.')}</dd>
      <dt>${t('الموعد','Due')}</dt><dd>${t('الخميس، قبل إرسال دعوات التجربة.','Thursday, before the beta invitations go out.')}</dd></dl></article></section>`,
      `<section class="edition review-desk">${heading(t('مراجعة قصيرة قبل نقل المهمة','A short review before moving a task'),t('افتح السجل أثناء مراجعة اللوحة. إذا تغيّر المطلوب أو الموعد، حدّثه في المهمة حتى يراه من يتولّى العمل بعدك. جرّب قائمة المراجعة هنا.','Open the record during board review. If the brief or deadline has changed, update the task so the next owner sees it. Try this review checklist.'))}
      <fieldset><legend>${t('قائمة مراجعة تجريبية','Sample review checklist')}</legend>${[
        t('الوصف يحدّد ما سنعدّه مكتملًا.','The description explains what counts as done.'),
        t('المرفق هو النسخة التي راجعها الفريق.','The attachment is the version the team reviewed.'),
        t('تعكس الحالة ما أُنجز بالفعل.','The status reflects the work actually completed.'),
      ].map(s => `<label><input type="checkbox"> ${s}</label>`).join('')}</fieldset></section>`,
    ];
  },
  chat(t) {
    return [
      `<section class="edition thread-reading">${heading(t('اقرأ النقاش كما جرى','Read a decision as it unfolds'),t('مثال من قناة المنتج. يطرح أحد الأعضاء سؤالًا، ويحدّد زميله القرار، ثم يتّفقان على من سيتابع التنفيذ.','An example from a product channel. One teammate raises a question, another records the decision, and they agree who will follow it through.'))}
      <ol>${[
        ['09:12',t('ريم','Reem'),t('لدينا نسختان من شاشة الترحيب. أيّهما نعتمد للتجربة؟','We have two versions of the welcome screen. Which one goes into the beta?')],
        ['09:17',t('سارة','Sara'),t('لنعتمد النسخة الأقصر. وضعت ملف النصّين هنا لتبقى المقارنة متاحة.','Let’s use the shorter version. I’ve attached both drafts here so we can refer back to the comparison.')],
        ['09:20',t('ريم','Reem'),t('سأراجعها على الهاتف اليوم، ثم أضع لقطة النتيجة في المهمة.','I’ll check it on mobile today and put a screenshot of the result on the task.')],
      ].map(([time,who,msg])=>`<li><time dir="ltr">${time}</time><div><strong>${who}</strong><p>${msg}</p></div></li>`).join('')}</ol></section>`,
      `<section class="edition pinned-note"><h2>${t('ما الذي يستحق التثبيت؟','Which message should you pin?')}</h2><blockquote>${t('اعتمدنا النص القصير. الملف في هذه الرسالة، وريم تتولّى المراجعة على الهاتف.','We agreed on the shorter copy. Both drafts are attached here, and Reem owns the mobile review.')}</blockquote><p>${t('ثبّت رسالة تجمع القرار ومرجعه. يستطيع العضو الذي ينضم إلى النقاش لاحقًا الرجوع إليها، بينما يبقى آخر تقدّم في التنفيذ مسجّلًا على المهمة.','Pin the message that brings the decision and its source together. A teammate joining later can recover the context, while the task holds the latest progress on delivery.')}</p></section>`,
    ];
  },
  teams(t) {
    return [
      `<section class="edition team-charter">${heading(t('دليل صغير لفريق جديد','A brief for a new team'),t('تخيّل أنك تنشئ فريقًا لتجربة التسجيل. اكتب في نبذته ما يحتاج إلى معرفته عضو ينضم غدًا. هذا مثال يمكنك تكييفه مع عملك.','Imagine starting a team to improve signup. Write its brief for someone joining tomorrow. Here is an example you could adapt.'))}
      <dl><dt>${t('المهمة','Remit')}</dt><dd>${t('نتابع التجربة من فتح الدعوة إلى إنشاء أول مهمة.','We own the experience from opening an invite to creating a first task.')}</dd><dt>${t('ما نراجعه','What we review')}</dt><dd>${t('نراجع صعوبات البدء كل خميس ونختار ما سنعالجه في الأسبوع التالي.','Each Thursday we review onboarding friction and choose what to address the following week.')}</dd><dt>${t('أين نجد السياق؟','Where to look')}</dt><dd>${t('القرارات في قناة الفريق، والتجارب الجارية في المهام، وملفات الاختبار في تبويب البيانات.','Decisions live in the team channel, active experiments in Tasks, and test files in the Data tab.')}</dd></dl></section>`,
      `<section class="edition membership-fork">${heading(t('ماذا يحدث عند انضمام عضو جديد؟','What happens when someone joins?'),t('يتوقّف ذلك على طريقة ربط القناة بالفريق. راجع العضوية عند إعداد الفريق، ثم عند تغيّر من يشارك في العمل.','It depends on how the channel was linked. Check membership when setting up the team and again when the people doing the work change.'))}
      <div>${note(t('قناة أنشأتها للفريق','Channel created for the team'),t('تتبع القناة عضوية الفريق. عندما تضمّ زميلًا إلى الفريق، تصبح له عضوية في قناته المرتبطة بهذه الطريقة.','The channel follows team membership. Adding someone to the team also includes them in a channel created this way.'))}
      ${note(t('قناة قائمة اخترت ربطها','Existing channel linked later'),t('تحتفظ القناة بأعضائها. تحقّق من أن الزميل يستطيع فتح النقاش والملفات التي يحتاج إليها قبل إحالة العمل إليه.','The channel keeps its own membership. Check that the teammate can open the discussion and required files before handing work over.'))}</div></section>`,
    ];
  },
  data(t) {
    return [
      `<section class="edition folder-guide">${heading(t('تتبّع الملف إلى مكانه','Follow a file back to its home'),t('افتح الفروع في هذا المثال لترى كيف يغيّر مكان الملف طريقة الوصول إليه. ابدأ بالسؤال عمّن يحتاج إلى قراءته.','Open the branches in this example to see how a file’s location affects access. Start by thinking about who needs to read it.'))}
      <div class="directory-tree">${disclosure(t('ملفاتي / مسوّدات','My files / Drafts'),t('ضع هنا مسوّدة الملاحظات التي تعمل عليها وحدك. قبل مشاركة رابطها، راجع من يحق له فتح الملف.','Keep a personal working draft here. Before sharing a link to it, check who can actually open the file.'),true)}
      ${disclosure(t('ملفات مساحة العمل / الإطلاق','Workspace files / Launch'),t('اجمع نسخة الخطة والمواد المعتمدة في مجلد واحد. ترث الملفات صلاحيات المجلد، فراجعها قبل نقل مسوّدة إلى داخله.','Gather the approved plan and launch materials in one folder. Files inherit folder access, so review it before moving a draft inside.'))}
      ${disclosure(t('مرفقات القناة / المنتج','Channel attachments / Product'),t('يظهر الملف المرفق برسالة ضمن بيانات القناة والفريق المرتبط بها. كلا العرضين يرجع إلى المرفق نفسه بصلاحيات القناة.','A message attachment appears under the channel and its linked team. Both views refer to the same attachment under the channel’s access rules.'))}</div></section>`,
      `<section class="edition file-handoff"><h2>${t('قبل تسليم مجلد العمل','Before handing over a folder')}</h2><p>${t('افتح المعاينة للتأكّد من النسخة التي ستسلّمها. اختر اسمًا يصف محتوى الملف، ثم راجع المجلد الوجهة ومن يستطيع فتحه. إذا وصل زميل إلى الرابط وتعذّر عليه عرض الملف، تحقّق من صلاحيات المجلد أو القناة التي أُرفق بها أولًا.','Preview the file to confirm which version you are handing over. Give it a recognizable name, then review its destination folder and audience. If a colleague has the link but cannot open it, check the folder or originating channel before sending another copy.')}</p></section>`,
    ];
  },
  meetings(t) {
    return [
      `<section class="edition agenda-sheet">${heading(t('جلسة مراجعة في نصف ساعة','A thirty-minute review'),t('مثال لجدول اجتماع قبل إطلاق منتج. خصّص لكل بند وقتًا ونتيجة تحتاج إلى حسمها مع الحاضرين.','A sample agenda for a launch review. Give each item time and a decision the participants need to reach.'))}
      <ol>${[
        ['10:00',t('راجع ما تغيّر','Review what changed'),t('افتح اللوحة وحدّد البنود التي اكتملت منذ آخر لقاء. اختر ما يحتاج فعلًا إلى نقاش.','Open the board and identify what has finished since the last meeting. Choose what actually needs discussion.')],
        ['10:10',t('احسم قرار الإصدار','Make the release decision'),t('راجع ملاحظات الاختبار مع أصحابها. سجّل ما يمنع الإطلاق وما يمكن متابعته بعده.','Review test feedback with its owners. Record what blocks the release and what can follow afterward.')],
        ['10:25',t('اتفق على المتابعة','Agree on the follow-up'),t('اسأل من سيتولّى كل بند ومتى يعود بالنتيجة. تأكّد من أن الجميع يقصد الموعد نفسه.','Agree on one owner and a return date for each item. Make sure everyone has the same date in mind.')],
      ].map(([time,name,body])=>`<li><time dir="ltr">${time}</time>${note(name,body)}</li>`).join('')}</ol></section>`,
      `<section class="edition minutes"><h2>${t('محضر يمكنك العمل منه','Minutes you can act on')}</h2><p>${t('في مثالنا، وافق الفريق على إطلاق النسخة بعد إصلاح رابط الدعوة. تتولّى سارة الإصلاح، وتختبره ريم يوم الخميس. أنشئ مهمة للإصلاح وأخرى للتحقّق حتى لا يبدو القرار مكتملًا فور انتهاء الاجتماع.','In this example, the team agreed to launch once the invitation link is fixed. Sara owns the fix and Reem will test it on Thursday. Track the repair and verification separately so everyone can see what remains after the meeting ends.')}</p></section>`,
    ];
  },
  mail(t) {
    return [
      `<section class="edition correspondence">${heading(t('رسالة واحدة، ومتابعتان مختلفتان','One email, two different follow-ups'),t('في هذا المثال يطلب العميل تعديل عرض قبل الخميس. يحتاج العميل إلى رد، ويحتاج الفريق إلى معرفة ما عليه إنجازه.','In this example a customer asks for a revised proposal by Thursday. The customer needs a reply and the team needs a clear piece of work.'))}
      <div class="letter-pair"><article><h3>${t('ردّ إلى العميل','Reply to the customer')}</h3><blockquote>${t('شكرًا على الملاحظات. سنراجع البند المتعلق بمدة الخدمة ونعود إليكم الخميس بالعرض المحدّث.','Thank you for the feedback. We’ll review the service period and send you the revised proposal on Thursday.')}</blockquote><p>${t('راجع المستلمين والحساب والمرفقات قبل إرسال الرد من البريد.','Check the recipients, sending account, and attachments before sending the reply in Mail.')}</p></article>
      <article><h3>${t('مهمة للفريق','Task for the team')}</h3><blockquote>${t('راجعي مدة الخدمة في العرض وأرفقي النسخة المحدّثة قبل ظهر الخميس.','Review the service period and attach the revised proposal before noon on Thursday.')}</blockquote><p>${t('استخدم «إلى مهمة» من الرسالة، وعدّل عنوانها ليصف العمل المطلوب، ثم اختر المسؤول والموعد.','Use To task from the message, edit its title to describe the work, then choose an owner and due date.')}</p></article></div></section>`,
      `<section class="edition mail-boundary"><h2>${t('ما الذي يحتاج الفريق إلى رؤيته؟','What should the team see?')}</h2><p>${t('حين تنقل متابعة من بريدك إلى اللوحة، اكتب ما يحتاجه زملاؤك للتنفيذ. قد تحتوي المحادثة على شروط تجارية أو تفاصيل خاصة. راجع ما ترفقه بالمهمة، ثم عد إلى سلسلة البريد الأصلية لإرسال النتيجة للعميل.','When moving a follow-up from your inbox to a board, write down the information your colleagues need to act. The thread may contain commercial terms or private details. Review what you attach to the task and return to the original email conversation to deliver the result.')}</p></section>`,
    ];
  },
  architecture(t) {
    return [
      `<section class="edition action-ledger">${heading(t('المهمة نفسها من مدخلين','One task, two entry points'),t('خذ طلبًا بسيطًا مثل إسناد مراجعة تصميم. يتغيّر من يبدأ الطلب، لكن السجل والعملية التي تعدّله يظلّان معروفين.','Consider assigning a design review. Who initiates the request can change while the record and the operation that updates it stay explicit.'))}
      <dl><dt>${t('من اللوحة','From the board')}</dt><dd>${t('تفتح المهمة، وتختار المسؤول، وترسل التغيير باسمك. يتحقّق مُعين من وصولك إلى المهمة ومن صلاحيتك لتعديلها.','You open the task, choose an assignee and submit the change as yourself. Moeen checks your access to the task and permission to update it.')}</dd>
      <dt>${t('من المحادثة','From the conversation')}</dt><dd>${t('تطلب من ai-moeen إسناد المهمة. يحدّد الوكيل السجل والإجراء، ويخضع الطلب لصلاحياتك وسياسة موافقات المساحة.','You ask ai-moeen to assign the task. The agent identifies the record and action. Your permissions and workspace approval policy govern the request.')}</dd>
      <dt><code dir="ltr">tasks.assign</code></dt><dd>${t('يطبَّق الإجراء على المهمة، ويُحفظ أثر التنفيذ باسم الفاعل. يستطيع الزميل الرجوع إلى المهمة لمعرفة المسؤول الحالي.','The action updates the task and records the actor. A teammate can return to the task to see who currently owns it.')}</dd></dl></section>`,
      `<section class="edition decision-gate"><h2>${t('عند تغيّر السجل قبل الموافقة','When the record changes before approval')}</h2><p>${t('لنفترض أن الوكيل اقترح نقل مجلد، ثم أُضيفت إليه ملفات قبل أن تراجع الطلب. ترتبط الموافقة بالعملية والوجهة والنسخة التي عُرضت عليك. إذا أصبح الطلب قديمًا، راجع طلبًا جديدًا يعكس المحتوى الحالي قبل التنفيذ.','Suppose an agent proposes moving a folder and someone adds files before you review it. Approval is tied to the proposed operation, destination, and record revision. If the proposal becomes stale, review a fresh request that reflects what would move now.')}</p></section>`,
    ];
  },
  ai_moeen(t) {
    return [
      `<section class="edition prompt-lab">${heading(t('جرّب صياغة الطلب بحسب ما تحتاجه','Choose a request by the outcome'),t('افتح أحد الأمثلة. توضّح كل صيغة ما يبحث عنه الوكيل وما ينبغي لك مراجعته في الرد. هذه أمثلة تعليمية يمكنك تكييفها مع مساحة عملك.','Open an example to see what the agent needs to look up and what to check in its response. Adapt these sample requests to the work in your own workspace.'))}
      ${disclosure(t('أريد معرفة ما بقي قبل الإطلاق','I want to know what is left before launch'),t('اطلب «راجع مهام فريق المنتج التي لم تكتمل ورتّبها حسب الموعد». حدّد اسم الفريق لتضييق البحث. راجع المهام بلا موعد أو مسؤول حين تقرّر ما ستتابعه أولًا.','Ask “Review the product team’s unfinished tasks and order them by due date.” Name the team to narrow the search. Check for missing dates or owners as you decide what to follow up first.'),true)}
      ${disclosure(t('أحتاج إلى قرار من نقاش طويل','I need the decision from a long discussion'),t('اذكر ai-moeen في القناة واسأله عمّا اتفق عليه المشاركون وما بقي دون حسم. راجع الرد في سياق النقاش قبل تحويل أي اقتراح إلى مهمة.','Mention ai-moeen in the channel and ask what participants agreed on and which questions remain open. Read the answer against the discussion before turning a suggestion into a task.'))}
      ${disclosure(t('أريد تفويض إجراء محدّد','I want to delegate a specific action'),t('اطلب إنشاء مهمة باسم واضح، وسمِّ من يتولّاها والموعد. افتح المهمة من نتيجة التنفيذ وراجع إسنادها بدلًا من إعادة الطلب.','Ask for a task with a clear title, owner, and date. Open the record from the result and check its assignment before repeating the request.'))}</section>`,
      `<section class="edition agent-private">${note(t('متى تبدأ من محادثة خاصة؟','When should you start privately?'),t('إذا كان السؤال يعتمد على ملف خاص بك، ابدأ محادثة خاصة مع ai-moeen. وعندما يحتاج الفريق إلى النتيجة، راجع المصدر ومن يستطيع الاطّلاع عليه قبل نقل الإجابة إلى قناة مشتركة.','Start privately when your question depends on a file only you can open. When the team needs the result, review the source and its audience before moving the answer into a shared channel.'))}</section>`,
    ];
  },
  mcp(t) {
    return [
      `<section class="edition client-runbook">${heading(t('اختبار اتصال بأقل صلاحية لازمة','Test a connection with the scope it needs'),t('إذا احتاج العميل الخارجي إلى عرض قائمة المهام فقط، ابدأ بصلاحية القراءة. استخدم إعداد العميل الصادر من مساحة العمل المقصودة.','For a client that only needs to list tasks, start with read access. Use the client configuration issued by the intended workspace.'))}
      <dl><dt dir="ltr">Streamable HTTP</dt><dd>${t('أدخل عنوان الخادم الظاهر في إعدادات MCP. يعود الرابط إلى مساحة العمل التي أنشأت الاتصال منها.','Enter the server URL shown in MCP settings. It belongs to the workspace that issued the connection.')}</dd>
      <dt dir="ltr">Authorization</dt><dd>${t('احفظ ترويسة المصادقة التي يعرضها الإعداد مرة واحدة في مخزن إعدادات العميل الخاص. استخدم اسمًا يوضّح الغرض من الاتصال عند مراجعته لاحقًا.','Save the one-time authorization header in the client’s private configuration. Give the connection a name that makes its purpose clear during a later review.')}</dd>
      <dt dir="ltr">tasks:read</dt><dd>${t('اطلب قائمة المهام من العميل وتحقّق من مساحة العمل والنتيجة. إذا احتاج سير العمل إلى الكتابة أيضًا، راجع نطاق الاتصال قبل اعتماده.','Request a task list and check the workspace and result. If the workflow also needs writes, review the connection scope before adopting it.')}</dd></dl></section>`,
      `<section class="edition revoke-note"><h2>${t('عند تسليم العميل أو إيقافه','When retiring or handing over a client')}</h2><p>${t('راجع في قائمة الاتصالات أي اعتماد خُصّص لذلك العميل. ألغِ الاعتماد عند انتهاء الحاجة إليه. وإذا احتاج فريق آخر إلى الاتصال، فليستخدم إعدادًا صادرًا من المساحة المناسبة وبصلاحيات تتوافق مع عمله.','Find the credential issued specifically for that client in the connections list. Revoke it when its work ends. A different team should use a configuration from the appropriate workspace with scopes suited to its own work.')}</p></section>`,
    ];
  },
  knowledge_base(t) {
    return [
      `<section class="edition source-reader">${heading(t('من فقرة في ملف إلى إجابة محدّدة','Read the passage behind an answer'),t('مثال توضيحي من مستند متطلبات. جرّب قراءة المقتطف أولًا ثم افتح الإجابة لترى أين ينتهي ما نعرفه من النص.','Here is an illustrative requirements excerpt. Read it first, then reveal the answer to see exactly what the passage establishes.'))}
      <figure>${caption('<bdi dir="ltr">shipment_requirements.md</bdi>')}<blockquote>${t('يُقبل ملف التصدير إذا احتوى على رقم الشحنة وتاريخ التسليم. تُراجع الحقول الناقصة قبل الإرسال.','An export is accepted when it includes the shipment number and delivery date. Missing fields are reviewed before submission.')}</blockquote></figure>
      ${disclosure(t('ما الحقول المطلوبة لقبول الملف؟','Which fields does the export require?'),t('رقم الشحنة وتاريخ التسليم. لا يحدّد هذا المقتطف من يراجع الحقول الناقصة. إذا احتجت إلى اسم المسؤول، اسأل عنه في مستند الإجراءات الذي يحدّد المسؤوليات.','The shipment number and delivery date. This excerpt does not name the reviewer for missing fields. For the owner, consult the operating procedure that assigns that responsibility.'))}</section>`,
      `<section class="edition source-health"><h2>${t('عندما لا يجد الوكيل المعلومة','When a detail cannot be found')}</h2><p>${t('ابدأ باسم الملف وصلاحية قراءته، ثم تحقّق من حالة الفهرسة. قد يحتاج المستند الممسوح ضوئيًا إلى نسخة تحتوي على نص قابل للاستخراج. وإذا طرحت السؤال في قناة، تذكّر أن الإجابة تراعي وصول المشاركين إلى المصادر.','Start with the filename and your access, then check the indexing state. A scanned document may need a version with extractable text. In a channel, the answer also depends on whether the participants have access to the sources.')}</p></section>`,
    ];
  },
  skills(t) {
    return [
      `<section class="edition recipe-bench">${heading(t('كيف تكتب مهارة مفيدة؟','Build a skill from a recurring request'),t('لنأخذ تسليم العمل بين زميلين في نهاية الأسبوع. احتفظ في المهارة بطريقة التسليم، واذكر في الطلب المهمة التي تريد تسليمها هذه المرّة.','Take a Friday handoff between teammates. Save the handoff method in the skill, then name the particular task in the request each time.'))}
      <div>${note(t('التعليمات المحفوظة','Saved instructions'),t('اكتب ما اكتمل، ثم ما بقي، ثم القرار المطلوب من الزميل. اذكر الروابط المتاحة ولا تضف موعدًا لم يتفق عليه الفريق.','List what is complete, what remains, and the decision the next teammate needs to make. Include available links and leave out dates the team has not agreed on.'))}
      ${note(t('طلب هذا الأسبوع','This week’s request'),t('حضّر تسليم مهمة مراجعة شاشة الترحيب إلى سارة باستخدام مهارة تسليم العمل.','Prepare the welcome screen review for handoff to Sara using the handoff skill.'))}
      ${note(t('ما الذي تراجعه؟','What to check'),t('تأكّد من أن الملخّص يصف الحالة الفعلية، وأن الروابط متاحة لمن يتسلّم المهمة، وأن القرار الأخير واضح.','Check that the summary reflects the actual state, the next owner can open the links, and the outstanding decision is clear.'))}</div></section>`,
      `<section class="edition recipe-margin"><h2>${t('عدّل المهارة بعد أول استخدام','Tune the instructions after the first run')}</h2><p>${t('إذا خرج الملخّص طويلًا كل مرة، حدّد عدد البنود أو ترتيبها في التعليمات المحفوظة. أمّا التفاصيل المتغيّرة، مثل اسم الزميل أو موعد التسليم، فاكتبها في الطلب التالي حتى لا تنتقل إلى أعمال أخرى.','If every handoff comes out too long, adjust the number or order of items in the saved instructions. Keep changing details such as a teammate’s name or a due date in the individual request so they do not carry over to unrelated work.')}</p></section>`,
    ];
  },
  integrations(t) {
    return [
      `<section class="edition routing-map">${heading(t('ابدأ من العمل الذي تريد إنجازه','Start with the job you need to do'),t('اختر المسار الأقرب إلى يومك. يعتمد كل مسار على حساب مختلف أو أذونات مختلفة، حتى عندما تأتي الأدوات من المزوّد نفسه.','Choose the path that matches your day. The account or permissions can differ for each job, even when the tools come from the same provider.'))}
      <ul>${[
        [t('متابعة رسالة من عميل','Follow up on a customer email'),'Gmail / Outlook',t('افتح البريد المتصل، وراجع السلسلة، وسجّل العمل المطلوب في مهمة قبل الرد.','Open the connected mailbox, review the thread, and record the work in a task before replying.'),'/product/mail/','gmail'],
        [t('تحديد موعد مع الفريق','Schedule time with the team'),'Google Calendar / Outlook',t('اختر التقويم الذي تريد أن يظهر فيه الموعد. يتطلّب إنشاء الحدث صلاحية الكتابة في ذلك التقويم.','Choose the calendar where the event should appear. Scheduling requires write access to that calendar.'),'/product/meetings/','google_calendar'],
        [t('دعوة المشاركين إلى مكالمة','Give attendees a meeting link'),'Meet / Teams / Zoom',t('استخدم خيار الاجتماع الذي يدعمه الحساب المتصل، ثم راجع رابط الانضمام في تفاصيل الموعد.','Use a conferencing option supported by the connected account, then check the join link in the event details.'),'/product/meetings/','zoom'],
      ].map(([job,provider,detail,href,logo])=>`<li><a href="${href}"><img src="/assets/logos/${logo}.svg" width="28" height="28" alt=""><strong>${job}</strong><bdi>${provider}</bdi><p>${detail}</p></a></li>`).join('')}</ul></section>`,
      `<section class="edition connection-check"><h2>${t('ربطت حسابي. أين أجد الخيار الذي أحتاجه؟','Connected an account and still looking for an option?')}</h2><p>${t('راجع الحساب الذي منح الإذن ومساحة العمل التي ربطته منها. في التقاويم، قد تستطيع رؤية المواعيد دون تعديلها. وفي الاجتماعات، يتوقّف إنشاء رابط الانضمام على دعم المزوّد والأذونات الممنوحة للحساب. افتح تفاصيل التطبيق قبل إعادة الربط.','Check which account granted access and which workspace holds the connection. You may be able to view calendar events without editing them. Meeting link creation depends on provider support and the permissions granted to the account. Review the app details before reconnecting.')}</p></section>`,
    ];
  },
};
