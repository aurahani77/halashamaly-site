/* AI visibility checklist data. tag: "doc" = documented by the platform, "prac" = practice (experience or industry, not confirmed by platforms). */
window.TOOL_DATA = {
 en: {
  title: "AI Visibility Checklist",
  intro: "30 checks for getting understood and cited by AI answer engines. Each one has a concrete step and a label: documented by the platforms, or practice from real projects.",
  areas: {A: "Access and crawling", B: "Content", C: "Brand and entity", D: "Structured data", E: "Sources and mentions", F: "Measurement"},
  tags: {doc: "Documented", prac: "Practice"},
  tagHelp: {doc: "The platform's own documentation says this.", prac: "From real projects or industry practice. The platforms have not confirmed it."},
  ui: {score: "Your score", of: "of", done: "checks done", level: ["Early stage: the biggest gains are ahead of you.", "Partly there: a few fixes would change a lot.", "Strong base: now it is about testing and upkeep."], next: "Your next 5 steps", nextEmpty: "Nothing left. Re-test your brand in the AI tools every month.", how: "How", reset: "Start over", save: "Your answers stay in this browser only.",
   leadTitle: "Want this result and a 5-step plan by email?", leadText: "I will send your score, the checks you missed, and a short plan. No spam. You can ask me to delete your data at any time.", name: "Name", email: "Email", site: "Website", wa: "WhatsApp (optional)", consent: "I agree to receive this result by email and to be contacted about it.", privacy: "Privacy notice", send: "Send me the result", sending: "Sending...", sent: "Sent. Check your inbox in a few minutes.", err: "Could not send. Please try again.", need: "Please fill your name, email and website, and tick the box."},
  checks: [
   ["A","doc",3,"Your key pages can be indexed","No noindex tag and not blocked in robots.txt. Check one page in Google Search Console, URL Inspection."],
   ["A","doc",3,"Your pages can show snippets","No nosnippet or very low max-snippet in the meta robots tag or X-Robots-Tag header. Google says these limit how your content is used in its search features."],
   ["A","doc",2,"AI search crawlers are not blocked","In robots.txt, allow the search bots of the tools you want to appear in, such as OAI-SearchBot (ChatGPT search), PerplexityBot and Claude-SearchBot. They are separate from training bots."],
   ["A","doc",2,"You made a deliberate choice about training crawlers","GPTBot, ClaudeBot and Google-Extended control training use. Decide on purpose and set it in robots.txt. Blocking them is separate from being cited."],
   ["A","doc",2,"Key content is real HTML text","Not only inside images or content that only appears after scripts run. View the page source and search for your main text."],
   ["A","doc",1,"A clean sitemap is submitted","Submit sitemap.xml in Search Console and remove URLs that redirect or return 404."],
   ["B","prac",3,"Each key page answers the main question in its first 1 or 2 sentences","Open every important page and rewrite the opening so it can be quoted alone."],
   ["B","prac",2,"Headings are the questions customers ask","\"How much does X cost?\" is easier to match than \"Pricing considerations\"."],
   ["B","prac",2,"Comparisons and steps use tables or lists","Structure makes it easy to lift one part of the page."],
   ["B","prac",2,"Your brand and product are named in full in the text","Use the real names, not only \"we\" or \"our solution\". A quoted passage loses its surroundings."],
   ["B","prac",2,"Pages contain concrete facts","Numbers, prices, limits, dates and conditions. Vague claims are rarely cited."],
   ["B","doc",2,"Content is original and written for people","Google's guidance asks for helpful, people-first content. Remove thin or duplicated pages."],
   ["B","prac",1,"A visible FAQ answers real questions","Write the answers in plain text on the page, based on what customers ask you."],
   ["B","prac",2,"You publish in the languages your customers search in","If they search in Arabic and English, have the key pages in both."],
   ["C","prac",3,"One fixed two-sentence definition of the brand","What you offer, for whom, in which category. Use the same text everywhere."],
   ["C","prac",2,"The category name appears in the title, H1 and About page","Say what you are in plain words, not only a slogan."],
   ["C","prac",2,"A clear \"we are X, not Y\" statement if you get misclassified","This helped Forlanso move from a freelance marketplace to a remote workforce system."],
   ["C","prac",2,"An About page with who, where, experts and contact","Show real people, experience and ownership."],
   ["C","prac",1,"Same name and description on LinkedIn, Google Business Profile and directories","Inconsistent descriptions confuse the model."],
   ["D","doc",2,"Organization schema with sameAs links","JSON-LD with your official profiles in sameAs. Google documents Organization structured data."],
   ["D","doc",2,"Schema matches what is visible and is validated","Test with the Rich Results Test or the Schema Markup Validator. Do not mark up what is not on the page."],
   ["D","doc",1,"Article, Product or FAQ schema where it fits","Use only the types that match the page."],
   ["D","prac",1,"An llms.txt file at the root","It is a proposal. The big platforms have not confirmed they use it, but writing it forces you to define your brand."],
   ["E","prac",3,"Test 10 real customer questions in the AI tools","Use ChatGPT, Gemini, Perplexity and Google AI Mode. Record whether you are mentioned, how you are described, and who appears instead."],
   ["E","prac",2,"Third-party pages that describe you are accurate","Directories, reviews and press. Fix wrong descriptions at the source."],
   ["E","prac",2,"Trusted sites in your field mention you","Press, partners, associations, guest articles."],
   ["E","prac",1,"Profiles on the platforms that matter for your category","For example Google Business Profile for local businesses."],
   ["F","prac",2,"Repeat the test every month and log the changes","Answers vary. Track the trend, not one result."],
   ["F","prac",1,"Track AI referrals in your analytics","Look for visits from chatgpt.com, perplexity.ai and similar sources."],
   ["F","doc",1,"Search Console is connected and checked","Watch indexing and coverage problems."]
  ]
 },
 ar: {
  title: "قائمة فحص ظهور العلامة بالذكاء الاصطناعي",
  intro: "30 فحصًا لتُفهم علامتك وتُقتبس في إجابات الذكاء الاصطناعي. لكل فحص خطوة عملية ووسم: موثّق من المنصات، أو ممارسة من مشاريع حقيقية.",
  areas: {A: "الوصول والزحف", B: "المحتوى", C: "العلامة والكيان", D: "البيانات المنظمة", E: "المصادر والإشارات", F: "القياس"},
  tags: {doc: "موثّق", prac: "ممارسة"},
  tagHelp: {doc: "توثيق المنصة نفسها يقول ذلك.", prac: "من مشاريع حقيقية أو من ممارسات المجال. لم تؤكدها المنصات."},
  ui: {score: "نتيجتك", of: "من", done: "فحصًا منجزًا", level: ["بداية: أكبر المكاسب أمامك.", "في منتصف الطريق: بضعة إصلاحات ستغير الكثير.", "أساس قوي: الآن الدور على الاختبار والمتابعة."], next: "خطواتك الخمس التالية", nextEmpty: "لا شيء متبق. أعد اختبار علامتك في أدوات الذكاء الاصطناعي كل شهر.", how: "كيف", reset: "ابدأ من جديد", save: "تبقى إجاباتك في هذا المتصفح فقط.",
   leadTitle: "تريد هذه النتيجة وخطة من 5 خطوات بالبريد؟", leadText: "سأرسل لك نتيجتك والفحوص التي لم تنجزها وخطة قصيرة. بلا رسائل مزعجة. يمكنك أن تطلب حذف بياناتك في أي وقت.", name: "الاسم", email: "البريد الإلكتروني", site: "الموقع", wa: "واتساب (اختياري)", consent: "أوافق على استلام هذه النتيجة بالبريد وعلى التواصل معي بشأنها.", privacy: "إشعار الخصوصية", send: "أرسل لي النتيجة", sending: "جارٍ الإرسال...", sent: "تم الإرسال. تفقد بريدك بعد دقائق.", err: "تعذر الإرسال. حاول مرة أخرى.", need: "يرجى تعبئة الاسم والبريد والموقع وتفعيل خانة الموافقة."},
  checks: [
   ["A","doc",3,"يمكن فهرسة صفحاتك المهمة","لا وسم noindex ولا حجب في robots.txt. افحص صفحة واحدة في Google Search Console عبر فحص الرابط."],
   ["A","doc",3,"يمكن لصفحاتك عرض مقتطفات","لا nosnippet ولا قيمة منخفضة جدًا لـ max-snippet في وسم robots أو ترويسة X-Robots-Tag. تقول Google إنها تحدّ من استخدام محتواك في ميزات البحث لديها."],
   ["A","doc",2,"زواحف بحث الذكاء الاصطناعي غير محجوبة","في robots.txt اسمح لزواحف البحث للأدوات التي تريد الظهور فيها، مثل OAI-SearchBot (بحث ChatGPT) وPerplexityBot وClaude-SearchBot. وهي منفصلة عن زواحف التدريب."],
   ["A","doc",2,"اتخذت قرارًا مقصودًا بشأن زواحف التدريب","GPTBot وClaudeBot وGoogle-Extended تتحكم في استخدام التدريب. قرر عن قصد واضبطها في robots.txt. وحجبها أمر منفصل عن الاقتباس."],
   ["A","doc",2,"المحتوى الأساسي نص HTML حقيقي","وليس داخل صور فقط أو محتوى لا يظهر إلا بعد تشغيل سكربتات. افتح مصدر الصفحة وابحث عن نصك الرئيسي."],
   ["A","doc",1,"خريطة موقع نظيفة مقدَّمة","قدّم sitemap.xml في Search Console واحذف الروابط التي تحوَّل أو تعطي 404."],
   ["B","prac",3,"كل صفحة مهمة تجيب عن السؤال الرئيسي في أول جملة أو جملتين","افتح كل صفحة مهمة وأعد كتابة بدايتها لتصلح للاقتباس وحدها."],
   ["B","prac",2,"العناوين هي أسئلة العملاء","«كم تكلفة كذا؟» أسهل في المطابقة من «اعتبارات التسعير»."],
   ["B","prac",2,"المقارنات والخطوات في جداول أو قوائم","البنية تسهّل اقتطاع جزء من الصفحة."],
   ["B","prac",2,"اسم علامتك ومنتجك مكتوب كاملًا في النص","استخدم الأسماء الحقيقية لا «نحن» أو «حلّنا» فقط. المقطع المقتبس يفقد ما حوله."],
   ["B","prac",2,"الصفحات فيها حقائق محددة","أرقام وأسعار وحدود وتواريخ وشروط. الادعاءات العامة نادرًا ما تُقتبس."],
   ["B","doc",2,"المحتوى أصلي ومكتوب للناس","إرشادات Google تطلب محتوى مفيدًا يضع الناس أولًا. احذف الصفحات الضعيفة أو المكررة."],
   ["B","prac",1,"قسم أسئلة شائعة ظاهر يجيب عن أسئلة حقيقية","اكتب الإجابات نصًا على الصفحة، بناءً على ما يسألك عنه العملاء."],
   ["B","prac",2,"تنشر باللغات التي يبحث بها عملاؤك","إن كانوا يبحثون بالعربية والإنجليزية فاجعل الصفحات الرئيسية بهما."],
   ["C","prac",3,"تعريف ثابت للعلامة من جملتين","ماذا تقدم، ولمن، وفي أي فئة. استخدم النص نفسه في كل مكان."],
   ["C","prac",2,"اسم الفئة ظاهر في العنوان وH1 وصفحة النبذة","قل ما أنت بكلمات بسيطة، لا شعارًا فقط."],
   ["C","prac",2,"عبارة واضحة «نحن X لا Y» إن صُنّفت خطأ","هذا ما ساعد Forlanso على الانتقال من سوق عمل حر إلى نظام قوى عاملة عن بعد."],
   ["C","prac",2,"صفحة نبذة فيها من أنتم وأين والخبراء والتواصل","اعرض أشخاصًا وخبرة وملكية حقيقية."],
   ["C","prac",1,"الاسم والوصف نفسهما في LinkedIn وملف Google التجاري والأدلة","الأوصاف المتضاربة تربك النموذج."],
   ["D","doc",2,"بيانات Organization مع روابط sameAs","JSON-LD وفيه حساباتك الرسمية في sameAs. وGoogle توثّق بيانات Organization المنظمة."],
   ["D","doc",2,"البيانات المنظمة تطابق ما يظهر وتم التحقق منها","اختبرها بأداة Rich Results Test أو Schema Markup Validator. لا تضف بيانات غير موجودة بالصفحة."],
   ["D","doc",1,"بيانات Article أو Product أو FAQ حيث تناسب","استخدم الأنواع المطابقة للصفحة فقط."],
   ["D","prac",1,"ملف llms.txt في الجذر","هو مقترح. لم تؤكد المنصات الكبرى أنها تستخدمه، لكن كتابته تجبرك على تعريف علامتك."],
   ["E","prac",3,"اختبر 10 أسئلة حقيقية لعملائك في أدوات الذكاء الاصطناعي","استخدم ChatGPT وGemini وPerplexity وGoogle AI Mode. سجّل هل ذُكرت، وبأي وصف، ومن ظهر بدلًا منك."],
   ["E","prac",2,"الصفحات الخارجية التي تصفك دقيقة","الأدلة والمراجعات والصحافة. صحّح الأوصاف الخاطئة عند مصدرها."],
   ["E","prac",2,"مواقع موثوقة في مجالك تذكرك","صحافة وشركاء وجمعيات ومقالات ضيف."],
   ["E","prac",1,"ملفاتك على المنصات المهمة لفئتك","مثل ملف Google التجاري للأعمال المحلية."],
   ["F","prac",2,"كرّر الاختبار كل شهر وسجّل التغيرات","الإجابات تتغير. تابع الاتجاه لا نتيجة واحدة."],
   ["F","prac",1,"تتبع الزيارات القادمة من الذكاء الاصطناعي في التحليلات","ابحث عن زيارات من chatgpt.com وperplexity.ai ومصادر مشابهة."],
   ["F","doc",1,"Search Console مربوط ومراقَب","راقب مشاكل الفهرسة والتغطية."]
  ]
 }
};

/* Auto-scan texts (the scan reads the public homepage, robots.txt, sitemap and llms.txt) */
window.TOOL_DATA.en.scan = {
  title: "Scan my site (optional)", text: "Enter your website and I will check 8 of the technical points for you: indexing, snippets, AI search bots, training bots, text in HTML, sitemap, Organization schema and llms.txt. I read only your public pages and store nothing.",
  placeholder: "yourwebsite.com", btn: "Scan", busy: "Scanning...", done: "Auto-checked", auto: "Auto",
  errors: {url: "That does not look like a website address.", unreachable: "I could not open that site.", rate: "Too many scans. Please try again later.", net: "Could not reach the scanner. Please try again."},
  msg: {
   0: {ok: "No noindex on the homepage, and robots.txt does not block everything.", noindex: "The homepage has a noindex directive.", robots_all: "robots.txt blocks all crawlers."},
   1: {ok: "No nosnippet or max-snippet:0 found.", nosnippet: "A nosnippet or max-snippet:0 directive limits your snippets."},
   2: {ok: "AI search bots (OAI-SearchBot, PerplexityBot, Claude-SearchBot) are not blocked.", bots_blocked: "Blocked in robots.txt: {bots}.", robots_all: "robots.txt blocks all crawlers."},
   3: {train_set: "robots.txt has explicit rules for: {bots}.", train_none: "No explicit rule for GPTBot, ClaudeBot or Google-Extended. Decide on purpose."},
   4: {ok: "The homepage has real text in its HTML.", thin: "Very little text in the HTML. Scripts may be rendering the content."},
   5: {ok: "A sitemap was found.", no_sitemap: "No sitemap at /sitemap.xml or in robots.txt."},
   19: {ok: "Organization or Person schema with sameAs links found.", no_sameas: "Structured data found, but without sameAs links.", no_jsonld: "No JSON-LD structured data on the homepage."},
   22: {ok: "An llms.txt file was found.", no_llms: "No llms.txt file found."}
  }
};
window.TOOL_DATA.ar.scan = {
  title: "افحص موقعي (اختياري)", text: "أدخل موقعك وأفحص لك 8 نقاط تقنية: الفهرسة والمقتطفات وزواحف بحث الذكاء الاصطناعي وزواحف التدريب والنص في HTML وخريطة الموقع وبيانات Organization وملف llms.txt. أقرأ صفحاتك العامة فقط ولا أحفظ شيئًا.",
  placeholder: "yourwebsite.com", btn: "افحص", busy: "جارٍ الفحص...", done: "فُحص تلقائيًا", auto: "تلقائي",
  errors: {url: "هذا لا يبدو عنوان موقع.", unreachable: "تعذر فتح هذا الموقع.", rate: "محاولات كثيرة. حاول لاحقًا.", net: "تعذر الوصول إلى أداة الفحص. حاول مرة أخرى."},
  msg: {
   0: {ok: "لا noindex في الصفحة الرئيسية، وrobots.txt لا يحجب كل شيء.", noindex: "الصفحة الرئيسية فيها توجيه noindex.", robots_all: "robots.txt يحجب كل الزواحف."},
   1: {ok: "لم يُعثر على nosnippet أو max-snippet:0.", nosnippet: "توجيه nosnippet أو max-snippet:0 يحدّ من مقتطفاتك."},
   2: {ok: "زواحف بحث الذكاء الاصطناعي (OAI-SearchBot وPerplexityBot وClaude-SearchBot) غير محجوبة.", bots_blocked: "محجوبة في robots.txt: {bots}.", robots_all: "robots.txt يحجب كل الزواحف."},
   3: {train_set: "في robots.txt قواعد صريحة لـ: {bots}.", train_none: "لا قاعدة صريحة لـ GPTBot أو ClaudeBot أو Google-Extended. قرر عن قصد."},
   4: {ok: "الصفحة الرئيسية فيها نص حقيقي في HTML.", thin: "نص قليل جدًا في HTML. ربما السكربتات هي التي تعرض المحتوى."},
   5: {ok: "وُجدت خريطة موقع.", no_sitemap: "لا خريطة موقع في /sitemap.xml ولا في robots.txt."},
   19: {ok: "وُجدت بيانات Organization أو Person مع روابط sameAs.", no_sameas: "وُجدت بيانات منظمة لكن دون روابط sameAs.", no_jsonld: "لا بيانات منظمة JSON-LD في الصفحة الرئيسية."},
   22: {ok: "وُجد ملف llms.txt.", no_llms: "لم يُعثر على ملف llms.txt."}
  }
};
