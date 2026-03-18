import { useState, useEffect, useRef, useCallback } from "react";

const VOCAB_RAW = {"1":[
  ["爱","ài","verb","to love, like","我爱你。","Wǒ ài nǐ.","I love you.","Expressing affection: Subject + 爱 + Object"],
  ["吧","ba","particle","suggestion particle","我们走吧。","Wǒmen zǒu ba.","Let's go.","Verb + 吧 = Suggestion/Command"],
  ["八","bā","numeral","eight","我有八个苹果。","Wǒ yǒu bā gè píngguǒ.","I have eight apples.","Number + Measure Word + Noun"],
  ["爸爸","bàba","noun","father/dad","爸爸在上班。","Bàba zài shàngbān.","Dad is at work.","Family terms reduplicated for familiarity"],
  ["百","bǎi","numeral","hundred","这本书一百元。","Zhè běn shū yī bǎi yuán.","This book is 100 yuan.","Number + 百 + (Measure Word)"],
  ["白天","báitiān","noun","daytime","我白天学习。","Wǒ báitiān xuéxí.","I study during the day.","Time word at beginning of sentence"],
  ["半","bàn","noun/adj","half","我吃了半块蛋糕。","Wǒ chī le bàn kuài dàngāo.","I ate half a cake.","半 + Measure Word + Noun"],
  ["包子","bāozi","noun","steamed bun","我喜欢吃包子。","Wǒ xǐhuān chī bāozi.","I like eating steamed buns.","Food vocabulary with 吃"],
  ["杯子","bēizi","noun","cup/glass","这是我的杯子。","Zhè shì wǒ de bēizi.","This is my cup.","Nouns with 子 suffix"],
  ["本","běn","measure word","for books","我有一本中文书。","Wǒ yǒu yī běn Zhōngwén shū.","I have a Chinese book.","Number + 本 + Book"],
  ["边","biān","noun/suffix","side","桌子边有一本书。","Zhuōzi biān yǒu yī běn shū.","There is a book beside the table.","Place + 边 = Location"],
  ["病","bìng","noun/verb","illness/sick","我生病了。","Wǒ shēngbìng le.","I am sick.","生病 = Verb phrase; 了 indicates change"],
  ["不","bù","adverb","not","我不喜欢咖啡。","Wǒ bù xǐhuān kāfēi.","I don't like coffee.","不 + Verb/Adjective (negation)"],
  ["不客气","búkèqi","phrase","you're welcome","A: 谢谢你。B: 不客气。","A: Xièxie nǐ. B: Bú kèqi.","A: Thank you. B: You're welcome.","Response to thanks"],
  ["不要","búyào","verb","don't want/don't","不要迟到。","Búyào chídào.","Don't be late.","不要 + Verb = Prohibition"],
  ["菜","cài","noun","dish/vegetable","今天的菜很好吃。","Jīntiān de cài hěn hǎochī.","Today's dish is delicious.","Subject + 很 + Adjective"],
  ["茶","chá","noun","tea","我喝一杯茶。","Wǒ hē yī bēi chá.","I drink a cup of tea.","喝 + Measure Word + 茶"],
  ["唱","chàng","verb","to sing","她会唱歌。","Tā huì chànggē.","She can sing.","会 + Verb = Learned skill"],
  ["超市","chāoshì","noun","supermarket","我去超市买东西。","Wǒ qù chāoshì mǎi dōngxi.","I go to the supermarket to buy things.","去 + Place + Verb Phrase"],
  ["车","chē","noun","car/vehicle","这是我的车。","Zhè shì wǒ de chē.","This is my car.","Possession: 的"],
  ["吃","chī","verb","to eat","我吃午饭。","Wǒ chī wǔfàn.","I eat lunch.","吃 + Meal/Food"],
  ["穿","chuān","verb","to wear","我穿一件外套。","Wǒ chuān yī jiàn wàitào.","I wear a coat.","穿 + Clothing"],
  ["出租车","chūzūchē","noun","taxi","我坐出租车去学校。","Wǒ zuò chūzūchē qù xuéxiào.","I take a taxi to school.","坐 + Transportation"],
  ["大","dà","adjective","big","这个房子很大。","Zhège fángzi hěn dà.","This house is big.","很 + Adjective (no 是)"],
  ["打电话","dǎ diànhuà","verb phrase","make a phone call","我给妈妈打电话。","Wǒ gěi māma dǎ diànhuà.","I call my mom.","给 + Person + 打电话"],
  ["大家","dàjiā","pronoun","everyone","大家好。","Dàjiā hǎo.","Hello everyone.","Plural pronoun for greeting"],
  ["到","dào","verb","to arrive","我到学校了。","Wǒ dào xuéxiào le.","I arrived at school.","到 + Place + 了"],
  ["大学","dàxué","noun","university","我在大学学习。","Wǒ zài dàxué xuéxí.","I study at university.","在 + Place + Verb"],
  ["大学生","dàxuéshēng","noun","university student","他是大学生。","Tā shì dàxuéshēng.","He is a university student.","Occupation + 是"],
  ["的","de","particle","possessive/modifier","这是我的书。","Zhè shì wǒ de shū.","This is my book.","Noun/Pronoun + 的 + Noun"],
  ["第","dì","prefix","ordinal prefix","我是第一名。","Wǒ shì dì-yī míng.","I am first place.","第 + Number = Ordinal"],
  ["店","diàn","noun","shop/store","我去书店买书。","Wǒ qù shūdiàn mǎi shū.","I go to the bookstore to buy books.","去 + Place + Verb"],
  ["点","diǎn","noun","o'clock/point","现在三点。","Xiànzài sān diǎn.","It's three o'clock.","Number + 点 = Time"],
  ["电话","diànhuà","noun","phone/telephone","我的电话是123456。","Wǒ de diànhuà shì yī'èrsān sìwǔliù.","My phone number is 123456.","Possessive: 的"],
  ["电脑","diànnǎo","noun","computer","我用电脑工作。","Wǒ yòng diànnǎo gōngzuò.","I use a computer to work.","用 + Tool + Verb"],
  ["电视","diànshì","noun","TV","我晚上看电视。","Wǒ wǎnshang kàn diànshì.","I watch TV in the evening.","看 + Entertainment"],
  ["电影","diànyǐng","noun","movie","我想看电影。","Wǒ xiǎng kàn diànyǐng.","I want to watch a movie.","想 + Verb = Want to"],
  ["电影院","diànyǐngyuàn","noun","cinema","电影院在那边。","Diànyǐngyuàn zài nàbiān.","The cinema is over there.","Place + 在 + Location"],
  ["弟弟","dìdi","noun","younger brother","我弟弟今年五岁。","Wǒ dìdi jīnnián wǔ suì.","My younger brother is five years old this year.","Family terms; Age: Number + 岁"],
  ["东西","dōngxi","noun","thing/object","我买了很多东西。","Wǒ mǎi le hěnduō dōngxi.","I bought many things.","很多 + Noun = Many"],
  ["都","dōu","adverb","all/both","我们都喜欢汉语。","Wǒmen dōu xǐhuān Hànyǔ.","We all like Chinese.","Subject + 都 + Verb"],
  ["读","dú","verb","to read","我每天读中文。","Wǒ měitiān dú Zhōngwén.","I read Chinese every day.","每天 + Verb = Daily routine"],
  ["对","duì","adjective","right/correct","你说得对。","Nǐ shuō de duì.","You're right.","Verb + 得 + Adjective"],
  ["对不起","duìbuqǐ","phrase","sorry","对不起，我迟到了。","Duìbuqǐ, wǒ chídào le.","Sorry, I'm late.","Apology + Reason"],
  ["多","duō","adjective","many/much","我有很多朋友。","Wǒ yǒu hěnduō péngyou.","I have many friends.","很多 + Noun"],
  ["多少","duōshao","pronoun","how many/how much","这个苹果多少钱？","Zhège píngguǒ duōshao qián?","How much is this apple?","Asking price/quantity (>10)"],
  ["读书","dúshū","verb phrase","to read books","我喜欢读书。","Wǒ xǐhuān dúshū.","I like reading books.","喜欢 + Verb Phrase"],
  ["二","èr","numeral","two","我有两个妹妹。","Wǒ yǒu liǎng gè mèimei.","I have two younger sisters.","Use 两 with measure words"],
  ["儿子","érzi","noun","son","他的儿子很可爱。","Tā de érzi hěn kě'ài.","His son is very cute.","Possession: 的"],
  ["饭","fàn","noun","meal/rice","我吃晚饭。","Wǒ chī wǎnfàn.","I eat dinner.","吃 + Meal"],
  ["饭店","fàndiàn","noun","restaurant/hotel","我们去饭店吃饭。","Wǒmen qù fàndiàn chīfàn.","We go to the restaurant to eat.","Place + Verb Phrase"],
  ["房间","fángjiān","noun","room","我的房间很干净。","Wǒ de fángjiān hěn gānjìng.","My room is very clean.","Subject + 很 + Adjective"],
  ["非常","fēicháng","adverb","very/extremely","我非常喜欢汉语。","Wǒ fēicháng xǐhuān Hànyǔ.","I really like Chinese.","非常 + Verb/Adjective"],
  ["飞机","fēijī","noun","airplane","我坐飞机去北京。","Wǒ zuò fēijī qù Běijīng.","I take a plane to Beijing.","坐 + Transportation"],
  ["分","fēn","noun/measure","minute/point","一分钟有六十秒。","Yī fēnzhōng yǒu liùshí miǎo.","One minute has sixty seconds.","Number + 分 = Minutes"],
  ["分钟","fēnzhōng","measure word","minute","我等你十分钟。","Wǒ děng nǐ shí fēnzhōng.","I'll wait for you for ten minutes.","Number + 分钟 = Duration"],
  ["高兴","gāoxìng","adjective","happy/glad","我今天很高兴。","Wǒ jīntiān hěn gāoxìng.","I am very happy today.","很 + Emotion Adjective"],
  ["个","gè","measure word","general measure","我有一个苹果。","Wǒ yǒu yī gè píngguǒ.","I have one apple.","Number + 个 + Noun"],
  ["歌","gē","noun","song","我喜欢听这首歌。","Wǒ xǐhuān tīng zhè shǒu gē.","I like listening to this song.","听 + Music/Song"],
  ["哥哥","gēge","noun","older brother","我哥哥是医生。","Wǒ gēge shì yīshēng.","My older brother is a doctor.","Family + 是 + Occupation"],
  ["给","gěi","verb/prep","to give/for","我给你一本书。","Wǒ gěi nǐ yī běn shū.","I give you a book.","给 + IO + DO"],
  ["公司","gōngsī","noun","company","爸爸在公司工作。","Bàba zài gōngsī gōngzuò.","Dad works at a company.","在 + Place + Verb"],
  ["工作","gōngzuò","verb/noun","to work/job","我每天工作八小时。","Wǒ měitiān gōngzuò bā xiǎoshí.","I work eight hours every day.","Time + Verb + Duration"],
  ["狗","gǒu","noun","dog","我家有一只狗。","Wǒ jiā yǒu yī zhǐ gǒu.","My family has a dog.","有 + Number + 只 + Animal"],
  ["贵","guì","adjective","expensive","这个东西很贵。","Zhège dōngxi hěn guì.","This thing is expensive.","Subject + 很 + Adjective"],
  ["国","guó","noun","country","中国是我的国家。","Zhōngguó shì wǒ de guójiā.","China is my country.","Country name + 是"],
  ["还","hái","adverb","still/also","我还想喝一杯茶。","Wǒ hái xiǎng hē yī bēi chá.","I still want to drink a cup of tea.","还 + Verb = Still/Also"],
  ["孩子","háizi","noun","child/kid","这个孩子很聪明。","Zhège háizi hěn cōngmíng.","This child is very smart.","这/那 + 个 + Noun"],
  ["汉语","Hànyǔ","noun","Chinese language","我学习汉语。","Wǒ xuéxí Hànyǔ.","I study Chinese.","学习 + Language"],
  ["汉字","Hànzì","noun","Chinese character","我认识很多汉字。","Wǒ rènshi hěnduō Hànzì.","I know many Chinese characters.","很多 + Noun"],
  ["号","hào","noun/measure","number/date","我的电话号码是123456。","Wǒ de diànhuà hàomǎ shì yī'èrsān sìwǔliù.","My phone number is 123456.","是 + Number"],
  ["好","hǎo","adjective","good/well","你好！","Nǐ hǎo!","Hello!","Greeting formula"],
  ["好吃","hǎochī","adjective","delicious","这个蛋糕很好吃。","Zhège dàngāo hěn hǎochī.","This cake is delicious.","Subject + 很 + Adjective"],
  ["好看","hǎokàn","adjective","good-looking","这件衣服很好看。","Zhè jiàn yīfu hěn hǎokàn.","This clothing is good-looking.","Subject + 很 + Adjective"],
  ["好听","hǎotīng","adjective","nice to hear","这首歌很好听。","Zhè shǒu gē hěn hǎotīng.","This song is nice to hear.","Subject + 很 + Adjective"],
  ["好玩儿","hǎowánr","adjective","fun","这个游戏很好玩儿。","Zhège yóuxì hěn hǎowánr.","This game is fun.","Subject + 很 + Adjective"],
  ["和","hé","conjunction","and/with","我和你一起去。","Wǒ hé nǐ yīqǐ qù.","I'll go with you.","Noun + 和 + Noun"],
  ["喝","hē","verb","to drink","我喝水。","Wǒ hē shuǐ.","I drink water.","喝 + Liquid"],
  ["很","hěn","adverb","very","我很开心。","Wǒ hěn kāixīn.","I am very happy.","很 + Adjective"],
  ["后","hòu","noun","behind/after","房子后面有一棵树。","Fángzi hòumiàn yǒu yī kē shù.","Behind the house there is a tree.","Place + 后面"],
  ["回","huí","verb","to return","我回家。","Wǒ huí jiā.","I go home.","回 + Place"],
  ["会","huì","verb","can/know how to","我会说汉语。","Wǒ huì shuō Hànyǔ.","I can speak Chinese.","会 + Verb (learned skill)"],
  ["火车","huǒchē","noun","train","我坐火车去上海。","Wǒ zuò huǒchē qù Shànghǎi.","I take a train to Shanghai.","坐 + Transportation"],
  ["几","jǐ","pronoun","how many/a few","你有几个苹果？","Nǐ yǒu jǐ gè píngguǒ?","How many apples do you have?","几 + Measure Word (1-10)"],
  ["家","jiā","noun/measure","home/family","我家有五口人。","Wǒ jiā yǒu wǔ kǒu rén.","My family has five people.","Family + 有 + Number"],
  ["见","jiàn","verb","to see/meet","我明天见你。","Wǒ míngtiān jiàn nǐ.","I'll see you tomorrow.","Time + Verb + Object"],
  ["件","jiàn","measure word","for clothes/items","我有一件衣服。","Wǒ yǒu yī jiàn yīfu.","I have one piece of clothing.","Number + 件 + Noun"],
  ["叫","jiào","verb","to be called/call","我叫小明。","Wǒ jiào Xiǎomíng.","My name is Xiaoming.","Subject + 叫 + Name"],
  ["饺子","jiǎozi","noun","dumpling","我喜欢吃饺子。","Wǒ xǐhuān chī jiǎozi.","I like eating dumplings.","喜欢 + 吃 + Food"],
  ["家人","jiārén","noun","family member","我爱我的家人。","Wǒ ài wǒ de jiārén.","I love my family.","Possession: 的"],
  ["鸡蛋","jīdàn","noun","egg","我吃鸡蛋。","Wǒ chī jīdàn.","I eat eggs.","吃 + Food"],
  ["姐姐","jiějie","noun","older sister","我姐姐是老师。","Wǒ jiějie shì lǎoshī.","My older sister is a teacher.","Family + 是 + Occupation"],
  ["今年","jīnnián","noun","this year","今年我二十岁。","Jīnnián wǒ èrshí suì.","I am twenty years old this year.","Time word at beginning"],
  ["今天","jīntiān","noun","today","今天天气很好。","Jīntiān tiānqì hěn hǎo.","The weather is nice today.","Topic + Comment"],
  ["九","jiǔ","numeral","nine","现在九点。","Xiànzài jiǔ diǎn.","It's nine o'clock.","Time: Number + 点"],
  ["觉得","juéde","verb","to think/feel","我觉得这个很好。","Wǒ juéde zhège hěn hǎo.","I think this is good.","觉得 + Opinion"],
  ["开","kāi","verb","to open/start","请开门。","Qǐng kāi mén.","Please open the door.","请 + Verb"],
  ["开车","kāichē","verb phrase","to drive a car","爸爸开车上班。","Bàba kāichē shàngbān.","Dad drives to work.","Verb + Object + Purpose"],
  ["看","kàn","verb","to look/watch","我看电视。","Wǒ kàn diànshì.","I watch TV.","看 + Visual Content"],
  ["看病","kànbìng","verb phrase","to see a doctor","我去医院看病。","Wǒ qù yīyuàn kànbìng.","I go to the hospital to see a doctor.","去 + Place + Verb Phrase"],
  ["看见","kànjiàn","verb","to see (result)","我看见一只狗。","Wǒ kànjiàn yī zhǐ gǒu.","I see a dog.","Verb + 见 = Result"],
  ["课","kè","noun","class/lesson","我们上中文课。","Wǒmen shàng Zhōngwén kè.","We have Chinese class.","上 + Class"],
  ["可以","kěyǐ","verb","can/may","我可以坐这里吗？","Wǒ kěyǐ zuò zhèlǐ ma?","May I sit here?","可以 + Verb = Permission"],
  ["口","kǒu","noun/measure","mouth","我有一口水。","Wǒ yǒu yī kǒu shuǐ.","I have a sip of water.","Number + 口 + Liquid"],
  ["块","kuài","measure word","piece/yuan","我吃了一块蛋糕。","Wǒ chī le yī kuài dàngāo.","I ate one piece of cake.","Number + 块 + Noun"],
  ["来","lái","verb","to come","我来学校了。","Wǒ lái xuéxiào le.","I came to school.","来 + Place + 了"],
  ["老师","lǎoshī","noun","teacher","她是中文老师。","Tā shì Zhōngwén lǎoshī.","She is a Chinese teacher.","Subject + 是 + Occupation"],
  ["了","le","particle","completed action","我吃饭了。","Wǒ chīfàn le.","I ate.","Verb + 了 = Completed"],
  ["冷","lěng","adjective","cold","今天很冷。","Jīntiān hěn lěng.","Today is cold.","Weather + 很 + Adjective"],
  ["里","lǐ","noun","inside","书包里有书。","Shūbāo lǐ yǒu shū.","There are books in the backpack.","Place + 里 + 有 + Noun"],
  ["两","liǎng","numeral","two","我有两个苹果。","Wǒ yǒu liǎng gè píngguǒ.","I have two apples.","两 + Measure Word"],
  ["零","líng","numeral","zero","现在零点。","Xiànzài líng diǎn.","It's zero o'clock.","Time: Number + 点"],
  ["六","liù","numeral","six","我有六个苹果。","Wǒ yǒu liù gè píngguǒ.","I have six apples.","Number + 个 + Noun"],
  ["吗","ma","particle","question particle","你好吗？","Nǐ hǎo ma?","How are you?","Statement + 吗 = Question"],
  ["卖","mài","verb","to sell","这家店卖水果。","Zhè jiā diàn mài shuǐguǒ.","This shop sells fruit.","Place + 卖 + Product"],
  ["买","mǎi","verb","to buy","我买一本书。","Wǒ mǎi yī běn shū.","I buy one book.","买 + Object"],
  ["妈妈","māma","noun","mother/mom","妈妈在做饭。","Māma zài zuòfàn.","Mom is cooking.","Subject + 在 + Verb"],
  ["忙","máng","adjective","busy","我今天很忙。","Wǒ jīntiān hěn máng.","I am busy today.","Time + Subject + 很 + Adjective"],
  ["猫","māo","noun","cat","我家有一只猫。","Wǒ jiā yǒu yī zhǐ māo.","My family has a cat.","有 + Number + 只 + Animal"],
  ["没关系","méiguānxi","phrase","it's okay","A: 对不起。B: 没关系。","A: Duìbuqǐ. B: Méi guānxi.","A: Sorry. B: It's okay.","Response to apology"],
  ["妹妹","mèimei","noun","younger sister","我妹妹很可爱。","Wǒ mèimei hěn kě'ài.","My younger sister is very cute.","Family + 很 + Adjective"],
  ["没事","méishì","phrase","it's okay","我没事。","Wǒ méishì.","I'm okay.","Subject + 没事"],
  ["没(有)","méi(yǒu)","verb","not have","我没有钱。","Wǒ méiyǒu qián.","I don't have money.","没有 + Noun"],
  ["们","men","suffix","plural suffix","我们是朋友。","Wǒmen shì péngyou.","We are friends.","Pronoun + 们 = Plural"],
  ["面包","miànbāo","noun","bread","我吃面包。","Wǒ chī miànbāo.","I eat bread.","吃 + Food"],
  ["面条儿","miàntiáor","noun","noodles","我喜欢吃面条儿。","Wǒ xǐhuān chī miàntiáor.","I like eating noodles.","喜欢 + 吃 + Food"],
  ["米饭","mǐfàn","noun","rice","我吃米饭。","Wǒ chī mǐfàn.","I eat rice.","Staple food + 吃"],
  ["明年","míngnián","noun","next year","明年我去中国。","Míngnián wǒ qù Zhōngguó.","Next year I'm going to China.","Time + Subject + Verb"],
  ["明天","míngtiān","noun","tomorrow","明天我去学校。","Míngtiān wǒ qù xuéxiào.","Tomorrow I go to school.","Time + Subject + Verb"],
  ["名字","míngzi","noun","name","你的名字是什么？","Nǐ de míngzi shì shénme?","What is your name?","Possession: 的"],
  ["那","nà","pronoun","that","那是我的书。","Nà shì wǒ de shū.","That is my book.","那 + 是 + Noun"],
  ["哪","nǎ","pronoun","which","哪个是你的？","Nǎge shì nǐ de?","Which one is yours?","哪 + Measure Word"],
  ["那边","nàbiān","pronoun","over there","书店在那边。","Shūdiàn zài nàbiān.","The bookstore is over there.","Place + 在 + Location"],
  ["那个","nàge","pronoun","that one","那个苹果是我的。","Nàge píngguǒ shì wǒ de.","That apple is mine.","那 + 个 + Noun"],
  ["哪个","nǎge","pronoun","which one","你喜欢哪个？","Nǐ xǐhuān nǎge?","Which one do you like?","哪个 as question"],
  ["那里","nàlǐ","pronoun","there","我在那里等你。","Wǒ zài nàlǐ děng nǐ.","I'll wait for you there.","在 + Location"],
  ["哪里","nǎlǐ","pronoun","where","你从哪里来？","Nǐ cóng nǎlǐ lái?","Where do you come from?","从 + 哪里 + 来"],
  ["男","nán","adjective","male","他是男生。","Tā shì nánshēng.","He is a male student.","Gender + 生 = Student"],
  ["男朋友","nánpéngyou","noun","boyfriend","他是我的男朋友。","Tā shì wǒ de nánpéngyou.","He is my boyfriend.","Possession: 的"],
  ["那儿","nàr","pronoun","there","我在那儿。","Wǒ zài nàr.","I am there.","在 + Location"],
  ["哪儿","nǎr","pronoun","where","你在哪儿？","Nǐ zài nǎr?","Where are you?","在 + 哪儿"],
  ["那些","nàxiē","pronoun","those","那些是我的书。","Nàxiē shì wǒ de shū.","Those are my books.","那 + 些 + Noun"],
  ["哪些","nǎxiē","pronoun","which ones","你要哪些？","Nǐ yào nǎxiē?","Which ones do you want?","哪些 as question"],
  ["呢","ne","particle","question particle","你呢？","Nǐ ne?","And you?","Topic + 呢 = 'And...?'"],
  ["能","néng","verb","can/be able to","我能说汉语。","Wǒ néng shuō Hànyǔ.","I can speak Chinese.","能 + Verb (ability)"],
  ["你","nǐ","pronoun","you (singular)","你好。","Nǐ hǎo.","Hello.","Subject pronoun"],
  ["你好","nǐhǎo","phrase","hello","你好！","Nǐ hǎo!","Hello!","Greeting"],
  ["年","nián","noun/measure","year","今年是2026年。","Jīnnián shì èr líng èr liù nián.","This year is 2026.","Number + 年"],
  ["你们","nǐmen","pronoun","you (plural)","你们好。","Nǐmen hǎo.","Hello everyone.","Pronoun + 们"],
  ["您","nín","pronoun","you (polite)","您好。","Nín hǎo.","Hello (polite).","Polite form"],
  ["牛奶","niúnǎi","noun","milk","我喝牛奶。","Wǒ hē niúnǎi.","I drink milk.","喝 + Beverage"],
  ["女","nǚ","adjective","female","她是女生。","Tā shì nǚshēng.","She is a female student.","Gender + 生 = Student"],
  ["女儿","nǚ'ér","noun","daughter","他的女儿很漂亮。","Tā de nǚ'ér hěn piàoliang.","His daughter is very beautiful.","Possession: 的"],
  ["女朋友","nǚpéngyou","noun","girlfriend","她是我的女朋友。","Tā shì wǒ de nǚpéngyou.","She is my girlfriend.","Possession: 的"],
  ["女士","nǚshì","noun","Ms./lady","这位女士很好。","Zhè wèi nǚshì hěn hǎo.","This lady is very nice.","这 + 位 + Noun"],
  ["朋友","péngyou","noun","friend","他是我的朋友。","Tā shì wǒ de péngyou.","He is my friend.","Possession: 的"],
  ["便宜","piányi","adjective","cheap","这个东西很便宜。","Zhège dōngxi hěn piányi.","This thing is cheap.","Subject + 很 + Adjective"],
  ["漂亮","piàoliang","adjective","beautiful","她很漂亮。","Tā hěn piàoliang.","She is beautiful.","Subject + 很 + Adjective"],
  ["苹果","píngguǒ","noun","apple","我喜欢吃苹果。","Wǒ xǐhuān chī píngguǒ.","I like eating apples.","喜欢 + 吃 + Fruit"],
  ["七","qī","numeral","seven","现在七点。","Xiànzài qī diǎn.","It's seven o'clock.","Time: Number + 点"],
  ["前","qián","noun","front/before","教室前面有黑板。","Jiàoshì qiánmiàn yǒu hēibǎn.","In front of the classroom there is a blackboard.","Place + 前面"],
  ["钱","qián","noun","money","我没有钱。","Wǒ méiyǒu qián.","I don't have money.","Subject + 没有 + Noun"],
  ["千","qiān","numeral","thousand","一千元。","Yī qiān yuán.","One thousand yuan.","Number + 千"],
  ["起床","qǐchuáng","verb phrase","to get up","我早上七点起床。","Wǒ zǎoshang qī diǎn qǐchuáng.","I get up at seven in the morning.","Time + Verb Phrase"],
  ["请","qǐng","verb","please","请进。","Qǐng jìn.","Please come in.","请 + Verb"],
  ["请问","qǐngwèn","phrase","excuse me","请问，厕所在哪里？","Qǐngwèn, cèsuǒ zài nǎlǐ?","Excuse me, where is the bathroom?","Polite inquiry"],
  ["去","qù","verb","to go","我去学校。","Wǒ qù xuéxiào.","I go to school.","去 + Place"],
  ["去年","qùnián","noun","last year","去年我去了北京。","Qùnián wǒ qù le Běijīng.","Last year I went to Beijing.","Time + Subject + Verb"],
  ["热","rè","adjective","hot","今天很热。","Jīntiān hěn rè.","Today is hot.","Weather + 很 + Adjective"],
  ["人","rén","noun","person/people","这里有很多人。","Zhèlǐ yǒu hěnduō rén.","There are many people here.","Place + 有 + Noun"],
  ["认识","rènshi","verb","to know/recognize","我认识你。","Wǒ rènshi nǐ.","I know you.","认识 + Person"],
  ["日","rì","noun","day/sun","今天是好日子。","Jīntiān shì hǎo rìzi.","Today is a good day.","Date: 月 + 日"],
  ["三","sān","numeral","three","我有三个苹果。","Wǒ yǒu sān gè píngguǒ.","I have three apples.","Number + 个 + Noun"],
  ["上","shàng","noun/verb","on/up/go to","我在上课。","Wǒ zài shàngkè.","I am in class.","上 + Class"],
  ["上班","shàngbān","verb phrase","to go to work","爸爸每天上班。","Bàba měitiān shàngbān.","Dad goes to work every day.","Time + Verb Phrase"],
  ["商店","shāngdiàn","noun","store/shop","我去商店买东西。","Wǒ qù shāngdiàn mǎi dōngxi.","I go to the store to buy things.","去 + Place + Verb"],
  ["上课","shàngkè","verb phrase","to have class","我们上午上课。","Wǒmen shàngwǔ shàngkè.","We have class in the morning.","Time + Verb Phrase"],
  ["上午","shàngwǔ","noun","morning","我上午学习。","Wǒ shàngwǔ xuéxí.","I study in the morning.","Time word at beginning"],
  ["上学","shàngxué","verb phrase","to go to school","我每天上学。","Wǒ měitiān shàngxué.","I go to school every day.","Time + Verb Phrase"],
  ["少","shǎo","adjective","few/little","人很少。","Rén hěn shǎo.","There are few people.","Subject + 很 + Adjective"],
  ["谁","shuí/shéi","pronoun","who","这是谁的书？","Zhè shì shuí de shū?","Whose book is this?","谁 + 的 + Noun"],
  ["生病","shēngbìng","verb phrase","to get sick","我生病了。","Wǒ shēngbìng le.","I got sick.","Subject + Verb + 了"],
  ["什么","shénme","pronoun","what","你叫什么名字？","Nǐ jiào shénme míngzi?","What is your name?","什么 + Noun"],
  ["十","shí","numeral","ten","我有十个苹果。","Wǒ yǒu shí gè píngguǒ.","I have ten apples.","Number + 个 + Noun"],
  ["事","shì","noun","thing/matter","我有一件事。","Wǒ yǒu yī jiàn shì.","I have one matter.","有 + Number + 件 + 事"],
  ["是","shì","verb","to be","我是学生。","Wǒ shì xuésheng.","I am a student.","Subject + 是 + Noun"],
  ["时候","shíhou","noun","time (when)","你什么时候来？","Nǐ shénme shíhou lái?","When are you coming?","什么时候 + Verb"],
  ["时间","shíjiān","noun","time (duration)","现在是三点。","Xiànzài shì sān diǎn.","Now is three o'clock.","是 + Time"],
  ["手机","shǒujī","noun","mobile phone","我用手机打电话。","Wǒ yòng shǒujī dǎ diànhuà.","I use my phone to make calls.","用 + Tool + Verb"],
  ["书","shū","noun","book","这是一本书。","Zhè shì yī běn shū.","This is a book.","是 + Number + 本 + Noun"],
  ["书店","shūdiàn","noun","bookstore","我去书店买书。","Wǒ qù shūdiàn mǎi shū.","I go to the bookstore to buy books.","去 + Place + Verb"],
  ["睡","shuì","verb","to sleep","我睡午觉。","Wǒ shuì wǔjiào.","I take a nap.","睡 + Sleep-related"],
  ["水","shuǐ","noun","water","我喝水。","Wǒ hē shuǐ.","I drink water.","喝 + Liquid"],
  ["水果","shuǐguǒ","noun","fruit","我喜欢吃水果。","Wǒ xǐhuān chī shuǐguǒ.","I like eating fruit.","喜欢 + 吃 + Food"],
  ["睡觉","shuìjiào","verb phrase","to sleep","我晚上十点睡觉。","Wǒ wǎnshang shí diǎn shuìjiào.","I sleep at ten in the evening.","Time + Verb Phrase"],
  ["说","shuō","verb","to speak/say","我说汉语。","Wǒ shuō Hànyǔ.","I speak Chinese.","说 + Language"],
  ["说话","shuōhuà","verb phrase","to speak/talk","请小声说话。","Qǐng xiǎoshēng shuōhuà.","Please speak quietly.","请 + Adverb + Verb"],
  ["四","sì","numeral","four","我有四个苹果。","Wǒ yǒu sì gè píngguǒ.","I have four apples.","Number + 个 + Noun"],
  ["岁","suì","measure word","years old","我二十岁。","Wǒ èrshí suì.","I am twenty years old.","Number + 岁"],
  ["他","tā","pronoun","he","他是学生。","Tā shì xuésheng.","He is a student.","Subject pronoun"],
  ["它","tā","pronoun","it","它是一只狗。","Tā shì yī zhǐ gǒu.","It is a dog.","是 + Noun"],
  ["她","tā","pronoun","she","她是老师。","Tā shì lǎoshī.","She is a teacher.","Subject pronoun"],
  ["太","tài","adverb","too/extremely","这个太贵了。","Zhège tài guì le.","This is too expensive.","太 + Adjective + 了"],
  ["他们","tāmen","pronoun","they (male/mixed)","他们是朋友。","Tāmen shì péngyou.","They are friends.","Pronoun + 们"],
  ["它们","tāmen","pronoun","they (objects)","它们是猫。","Tāmen shì māo.","They are cats.","Pronoun + 们"],
  ["她们","tāmen","pronoun","they (female)","她们是同学。","Tāmen shì tóngxué.","They are classmates.","Pronoun + 们"],
  ["天","tiān","noun/measure","sky/day","今天是好天。","Jīntiān shì hǎo tiān.","Today is a nice day.","Topic + Comment"],
  ["天气","tiānqì","noun","weather","今天天气很好。","Jīntiān tiānqì hěn hǎo.","The weather is nice today.","Topic + Comment"],
  ["听","tīng","verb","to listen","我听音乐。","Wǒ tīng yīnyuè.","I listen to music.","听 + Audio"],
  ["听见","tīngjiàn","verb","to hear","我听见声音。","Wǒ tīngjiàn shēngyīn.","I hear a sound.","Verb + 见 = Result"],
  ["同学","tóngxué","noun","classmate","他是我的同学。","Tā shì wǒ de tóngxué.","He is my classmate.","Possession: 的"],
  ["外","wài","noun","outside","外面很冷。","Wàimiàn hěn lěng.","Outside is cold.","Place + 面"],
  ["外边","wàibiān","noun","outside","外边在下雨。","Wàibiān zài xiàyǔ.","It's raining outside.","Location + 在 + Verb"],
  ["玩","wán","verb","to play","我和朋友玩。","Wǒ hé péngyou wán.","I play with friends.","和 + Person + Verb"],
  ["晚","wǎn","adjective/noun","late/evening","今天我回家晚了。","Jīntiān wǒ huí jiā wǎn le.","Today I went home late.","Subject + Verb + 晚了"],
  ["晚饭","wǎnfàn","noun","dinner","我吃晚饭。","Wǒ chī wǎnfàn.","I eat dinner.","吃 + Meal"],
  ["晚上","wǎnshang","noun","evening","我晚上学习。","Wǒ wǎnshang xuéxí.","I study in the evening.","Time word at beginning"],
  ["喂","wèi","interjection","hello (phone)","喂，你好。","Wèi, nǐ hǎo.","Hello (on phone).","Phone greeting"],
  ["问","wèn","verb","to ask","我问老师一个问题。","Wǒ wèn lǎoshī yī gè wèntí.","I ask the teacher a question.","问 + Person + Question"],
  ["问题","wèntí","noun","question/problem","我有一个问题。","Wǒ yǒu yī gè wèntí.","I have a question.","有 + Number + 个 + 问题"],
  ["我","wǒ","pronoun","I/me","我是学生。","Wǒ shì xuésheng.","I am a student.","Subject pronoun"],
  ["我们","wǒmen","pronoun","we/us","我们学习汉语。","Wǒmen xuéxí Hànyǔ.","We study Chinese.","Pronoun + 们"],
  ["五","wǔ","numeral","five","我有五个苹果。","Wǒ yǒu wǔ gè píngguǒ.","I have five apples.","Number + 个 + Noun"],
  ["午饭","wǔfàn","noun","lunch","我吃午饭。","Wǒ chī wǔfàn.","I eat lunch.","吃 + Meal"],
  ["下","xià","noun/verb","under/down","我下课了。","Wǒ xiàkè le.","My class ended.","下 + Class"],
  ["下雨","xiàyǔ","verb phrase","to rain","今天下雨。","Jīntiān xiàyǔ.","It's raining today.","Weather event"],
  ["下班","xiàbān","verb phrase","to get off work","爸爸下班回家。","Bàba xiàbān huí jiā.","Dad gets off work and goes home.","Verb Phrase + Purpose"],
  ["下课","xiàkè","verb phrase","to finish class","我们下课了。","Wǒmen xiàkè le.","Our class ended.","Subject + Verb + 了"],
  ["想","xiǎng","verb","to want/think","我想喝水。","Wǒ xiǎng hē shuǐ.","I want to drink water.","想 + Verb"],
  ["先生","xiānsheng","noun","Mr./sir","先生您好。","Xiānsheng nín hǎo.","Hello, sir.","Title + Name"],
  ["现在","xiànzài","noun","now","现在三点。","Xiànzài sān diǎn.","It's three o'clock now.","现在 + Time"],
  ["小","xiǎo","adjective","small/little","这个很小。","Zhège hěn xiǎo.","This is very small.","Subject + 很 + Adjective"],
  ["小朋友","xiǎopéngyǒu","noun","child/kid","小朋友很可爱。","Xiǎopéngyǒu hěn kě'ài.","The child is very cute.","Subject + 很 + Adjective"],
  ["小时","xiǎoshí","noun","hour","我学习两小时。","Wǒ xuéxí liǎng xiǎoshí.","I study for two hours.","Duration: Number + 小时"],
  ["小学","xiǎoxué","noun","primary school","我上小学。","Wǒ shàng xiǎoxué.","I go to primary school.","上 + School"],
  ["小学生","xiǎoxuéshēng","noun","primary student","我是小学生。","Wǒ shì xiǎoxuéshēng.","I am a primary school student.","Subject + 是 + Identity"],
  ["下午","xiàwǔ","noun","afternoon","我下午上课。","Wǒ xiàwǔ shàngkè.","I have class in the afternoon.","Time + Verb Phrase"],
  ["写","xiě","verb","to write","我写汉字。","Wǒ xiě Hànzì.","I write Chinese characters.","写 + Content"],
  ["些","xiē","measure word","some","我买了些水果。","Wǒ mǎi le xiē shuǐguǒ.","I bought some fruit.","Verb + 了 + 些 + Noun"],
  ["谢谢","xièxie","verb","to thank","谢谢你。","Xièxie nǐ.","Thank you.","谢谢 + Person"],
  ["喜欢","xǐhuan","verb","to like","我喜欢汉语。","Wǒ xǐhuan Hànyǔ.","I like Chinese.","喜欢 + Noun/Verb"],
  ["新","xīn","adjective","new","这是我的新手机。","Zhè shì wǒ de xīn shǒujī.","This is my new phone.","的 + Adjective + Noun"],
  ["星期","xīngqī","noun","week","今天是星期一。","Jīntiān shì xīngqī yī.","Today is Monday.","星期 + Number"],
  ["星期日","xīngqīrì","noun","Sunday","星期日我休息。","Xīngqīrì wǒ xiūxi.","On Sunday I rest.","Time + Subject + Verb"],
  ["星期天","xīngqītiān","noun","Sunday","星期天我去公园。","Xīngqītiān wǒ qù gōngyuán.","On Sunday I go to the park.","Time + Subject + Verb"],
  ["休息","xiūxi","verb/noun","to rest","我今天休息。","Wǒ jīntiān xiūxi.","Today I rest.","Time + Subject + Verb"],
  ["学","xué","verb","to learn/study","我学汉语。","Wǒ xué Hànyǔ.","I study Chinese.","学 + Subject"],
  ["雪","xuě","noun/verb","snow","冬天下雪。","Dōngtiān xià xuě.","It snows in winter.","Season + Verb"],
  ["学生","xuésheng","noun","student","我是学生。","Wǒ shì xuésheng.","I am a student.","Subject + 是 + Identity"],
  ["学习","xuéxí","verb/noun","to study","我学习汉语。","Wǒ xuéxí Hànyǔ.","I study Chinese.","学习 + Subject"],
  ["学校","xuéxiào","noun","school","我在学校学习。","Wǒ zài xuéxiào xuéxí.","I study at school.","在 + Place + Verb"],
  ["要","yào","verb","to want/need","我要一杯水。","Wǒ yào yī bēi shuǐ.","I want a cup of water.","要 + Object"],
  ["也","yě","adverb","also","我也喜欢汉语。","Wǒ yě xǐhuān Hànyǔ.","I also like Chinese.","Subject + 也 + Verb"],
  ["一","yī","numeral","one","我有一个苹果。","Wǒ yǒu yī gè píngguǒ.","I have one apple.","一 + Measure Word"],
  ["一半","yībàn","noun","half","我吃了一半苹果。","Wǒ chī le yībàn píngguǒ.","I ate half an apple.","Verb + 了 + 一半 + Noun"],
  ["一点儿","yìdiǎnr","quantity","a little","我喝一点儿水。","Wǒ hē yìdiǎnr shuǐ.","I drink a little water.","Verb + 一点儿 + Noun"],
  ["衣服","yīfu","noun","clothes","这是我的衣服。","Zhè shì wǒ de yīfu.","This is my clothing.","Possession: 的"],
  ["医生","yīshēng","noun","doctor","他是医生。","Tā shì yīshēng.","He is a doctor.","Subject + 是 + Occupation"],
  ["一下","yíxià","quantity","a little/once","我看一下。","Wǒ kàn yíxià.","I'll take a look.","Verb + 一下"],
  ["一些","yìxiē","quantity","some","我买了一些水果。","Wǒ mǎi le yìxiē shuǐguǒ.","I bought some fruit.","Verb + 了 + 一些 + Noun"],
  ["医院","yīyuàn","noun","hospital","我去医院看病。","Wǒ qù yīyuàn kànbìng.","I go to the hospital to see a doctor.","去 + Place + Verb"],
  ["椅子","yǐzi","noun","chair","这是椅子。","Zhè shì yǐzi.","This is a chair.","是 + Noun"],
  ["有","yǒu","verb","to have/there is","我有一本书。","Wǒ yǒu yī běn shū.","I have a book.","Subject + 有 + Object"],
  ["有的","yǒude","pronoun","some (of)","有的苹果是红的。","Yǒude píngguǒ shì hóng de.","Some apples are red.","有的 + Noun + 是 + Adjective"],
  ["有些","yǒuxiē","pronoun","some","有些学生喜欢运动。","Yǒuxiē xuésheng xǐhuān yùndòng.","Some students like sports.","有些 + Noun + Verb"],
  ["有(一)点儿","yǒu(yì)diǎnr","adverb","a little","我有点儿累。","Wǒ yǒudiǎnr lèi.","I am a little tired.","Subject + 有点儿 + Adjective"],
  ["雨","yǔ","noun/verb","rain","今天下雨。","Jīntiān xià yǔ.","It's raining today.","Weather event"],
  ["元","yuán","measure word","yuan","这个苹果五元。","Zhège píngguǒ wǔ yuán.","This apple is five yuan.","Number + 元"],
  ["月","yuè","noun","month","现在一月。","Xiànzài yī yuè.","It's January now.","Number + 月"],
  ["再","zài","adverb","again/then","我再见你。","Wǒ zài jiàn nǐ.","I'll see you again.","再 + Verb"],
  ["在","zài","verb/prep","to be at/in","我在学校。","Wǒ zài xuéxiào.","I am at school.","在 + Place"],
  ["再见","zàijiàn","phrase","goodbye","再见！","Zàijiàn!","Goodbye!","Leave-taking"],
  ["早","zǎo","adjective/adv","early/morning","我早上七点起床。","Wǒ zǎoshang qī diǎn qǐchuáng.","I get up at seven in the morning.","Time + Verb Phrase"],
  ["早饭","zǎofàn","noun","breakfast","我吃早饭。","Wǒ chī zǎofàn.","I eat breakfast.","吃 + Meal"],
  ["早上","zǎoshang","noun","morning","我早上学习。","Wǒ zǎoshang xuéxí.","I study in the morning.","Time word at beginning"],
  ["怎么","zěnme","pronoun","how","你怎么去？","Nǐ zěnme qù?","How are you going?","怎么 + Verb"],
  ["怎么样","zěnmeyàng","pronoun","how about","这本书怎么样？","Zhè běn shū zěnmeyàng?","How about this book?","Noun + 怎么样？"],
  ["找","zhǎo","verb","to look for","我找我的书。","Wǒ zhǎo wǒ de shū.","I'm looking for my book.","找 + Object"],
  ["这","zhè","pronoun","this","这是我的书。","Zhè shì wǒ de shū.","This is my book.","这 + 是 + Noun"],
  ["这边","zhèbiān","pronoun","here","书店在这边。","Shūdiàn zài zhèbiān.","The bookstore is here.","Place + 在 + 这边"],
  ["这个","zhège","pronoun","this one","这个苹果是我的。","Zhège píngguǒ shì wǒ de.","This apple is mine.","这 + 个 + Noun"],
  ["这里","zhèlǐ","pronoun","here","我在这里等你。","Wǒ zài zhèlǐ děng nǐ.","I'll wait for you here.","在 + 这里 + Verb"],
  ["真","zhēn","adverb","really","这个真好。","Zhège zhēn hǎo.","This is really good.","Subject + 真 + Adjective"],
  ["正在","zhèngzài","adverb","in progress","我正在学习。","Wǒ zhèngzài xuéxí.","I am studying right now.","Subject + 正在 + Verb"],
  ["这儿","zhèr","pronoun","here","我在这儿。","Wǒ zài zhèr.","I am here.","在 + 这儿"],
  ["这些","zhèxiē","pronoun","these","这些是我的书。","Zhèxiē shì wǒ de shū.","These are my books.","这 + 些 + Noun"],
  ["只","zhī","measure word","for animals","一只鸟。","Yī zhī niǎo.","One bird.","Number + 只 + Animal"],
  ["知道","zhīdào","verb","to know","我知道这个。","Wǒ zhīdào zhège.","I know this.","知道 + Object"],
  ["中国","Zhōngguó","noun","China","我爱中国。","Wǒ ài Zhōngguó.","I love China.","Country name"],
  ["中文","Zhōngwén","noun","Chinese language","我学中文。","Wǒ xué Zhōngwén.","I study Chinese.","学 + Language"],
  ["中午","zhōngwǔ","noun","noon","我中午吃饭。","Wǒ zhōngwǔ chīfàn.","I eat at noon.","Time + Subject + Verb"],
  ["中学","zhōngxué","noun","middle school","我上中学。","Wǒ shàng zhōngxué.","I go to middle school.","上 + School"],
  ["中学生","zhōngxuéshēng","noun","middle school student","我是中学生。","Wǒ shì zhōngxuéshēng.","I am a middle school student.","Subject + 是 + Identity"],
  ["住","zhù","verb","to live","我住在北京。","Wǒ zhù zài Běijīng.","I live in Beijing.","住 + 在 + Place"],
  ["桌子","zhuōzi","noun","table/desk","桌子上有书。","Zhuōzi shàng yǒu shū.","On the table there are books.","Place + 上 + 有 + Noun"],
  ["字","zì","noun","character/word","我写汉字。","Wǒ xiě Hànzì.","I write Chinese characters.","写 + Character"],
  ["坐","zuò","verb","to sit/travel by","我坐火车回家。","Wǒ zuò huǒchē huí jiā.","I take the train home.","坐 + Transportation"],
  ["做","zuò","verb","to do/make","我做作业。","Wǒ zuò zuòyè.","I do homework.","做 + Activity"],
  ["做饭","zuòfàn","verb phrase","to cook","妈妈在做饭。","Māma zài zuòfàn.","Mom is cooking.","Subject + 在 + Verb Phrase"],
  ["昨天","zuótiān","noun","yesterday","昨天我学习。","Zuótiān wǒ xuéxí.","Yesterday I studied.","Time + Subject + Verb"]],
"2": [
  ["啊","a","particle","modal particle (exclamation)","啊，你来了！","","","Used at sentence beginning for exclamation"],
  ["爱好","àihào","noun/verb","hobby, to like","我的爱好是读书。","","","是...的 structure to emphasize"],
  ["白色","báisè","noun","white color","我喜欢白色的衣服。","","","Color + 的 + Noun"],
  ["班","bān","noun/measure","class, shift","我在一班上课。","","","在 + Number + 班"],
  ["帮","bāng","verb","to help","我帮你拿包。","","","帮 + Person + Verb"],
  ["帮忙","bāngmáng","verb/noun","to help","请你帮忙。","","","请 + Person + 帮忙"],
  ["包","bāo","noun/verb/measure","bag, to wrap","我有一个包。","","","Number + 个 + 包"],
  ["本子","běnzi","noun","notebook","我用本子写字。","","","用 + Tool + Verb"],
  ["比","bǐ","preposition","than","我比你高。","","","A + 比 + B + Adjective"],
  ["笔","bǐ","noun/measure","pen, pencil","我有一支笔。","","","Number + 支 + 笔"],
  ["别","bié","adverb","don't","别说话。","","","别 + Verb = Prohibition"],
  ["不好意思","bù hǎoyìsi","phrase","sorry, embarrassed","不好意思，我迟到了。","","","Apology for minor mistakes"],
  ["不错","búcuò","adjective","not bad, good","你做得不错。","","","Verb + 得 + 不错"],
  ["长","cháng","adjective","long","这条路很长。","","","Subject + 很 + Adjective"],
  ["车站","chēzhàn","noun","station, stop","我在车站等你。","","","在 + Place + Verb"],
  ["出","chū","verb","to go out","我出门了。","","","出 + Place + 了"],
  ["床","chuáng","noun","bed","我在床上睡觉。","","","在 + Noun + 上"],
  ["出国","chūguó","verb","to go abroad","我明年出国。","","","Time + Subject + Verb"],
  ["出来","chūlái","verb","to come out","请出来一下。","","","Verb + 出来 + 一下"],
  ["出门","chūmén","verb","to go out","我今天不出门。","","","Time + 不 + Verb Phrase"],
  ["出去","chūqù","verb","to go out","我出去买东西。","","","Verb + Purpose"],
  ["词","cí","noun","word","我学新单词。","","","学 + Adjective + Noun"],
  ["次","cì","measure word","time (frequency)","我去过一次北京。","","","Verb + 过 + Number + 次"],
  ["从","cóng","preposition","from","我从家出发。","","","从 + Place + Verb"],
  ["从小","cóngxiǎo","adverb","since childhood","我从小喜欢音乐。","","","从小 + Subject + Verb"],
  ["错","cuò","adjective","wrong","你错了。","","","Subject + Verb + 了"],
  ["打","dǎ","verb","to hit, play, make","我打电话。","","","打 + Phone/Ball"],
  ["打车","dǎchē","verb","to take a taxi","我打车去机场。","","","打车 + 去 + Place"],
  ["打开","dǎkāi","verb","to open","我打开窗户。","","","Subject + 打开 + Object"],
  ["但","dàn","conjunction","but","我想去，但没时间。","","","Clause + 但 + Clause"],
  ["但是","dànshì","conjunction","but","我喜欢，但是太贵了。","","","Clause + 但是 + Clause"],
  ["得","de","particle","complement particle","我跑得快。","","","Verb + 得 + Adjective"],
  ["地","de","particle","adverbial particle","我慢慢地走。","","","Adjective + 地 + Verb"],
  ["等","děng","verb","to wait","我等你。","","","等 + Person/Thing"],
  ["点","diǎn","verb/noun","to order, o'clock","我点了一杯咖啡。","","","点 + Number + 杯 + Noun"],
  ["地铁","dìtiě","noun","subway","我坐地铁上班。","","","坐 + Transportation + Purpose"],
  ["动","dòng","verb","to move","不要动。","","","不要 + Verb"],
  ["懂","dǒng","verb","to understand","我懂你的意思。","","","懂 + Object"],
  ["饭馆","fànguǎn","noun","restaurant","我在饭馆吃饭。","","","在 + Place + Verb"],
  ["飞","fēi","verb","to fly","鸟会飞。","","","Subject + 会 + Verb"],
  ["高","gāo","adjective","tall, high","山很高。","","","Subject + 很 + Adjective"],
  ["告诉","gàosù","verb","to tell","我告诉妈妈一件事。","","","告诉 + Person + Object"],
  ["高中","gāozhōng","noun","high school","我在上高中。","","","上 + School"],
  ["跟","gēn","preposition","with","我跟朋友一起去。","","","跟 + Person + 一起 + Verb"],
  ["个子","gèzi","noun","height, stature","他个子很高。","","","Subject + 个子 + 很 + Adjective"],
  ["公交车","gōngjiāochē","noun","bus","我坐公交车。","","","坐 + Transportation"],
  ["过","guo","particle","experience particle","我吃过饭了。","","","Verb + 过 = Experience"],
  ["过来","guòlái","verb","to come over","请过来。","","","Directional complement"],
  ["过年","guònián","verb","to celebrate New Year","我们过年回家。","","","Time + Verb Phrase"],
  ["过去","guòqù","verb/noun","to go over, past","他过去是老师。","","","Subject + 过去 + 是 + Noun"],
  ["还是","háishì","adverb","still, or","我还是要去。","","","Subject + 还是 + Verb"],
  ["黑色","hēisè","noun","black color","我喜欢黑色。","","","喜欢 + Color"],
  ["红茶","hóngchá","noun","black tea","我喝红茶。","","","喝 + Beverage"],
  ["红色","hóngsè","noun","red color","这是红色的花。","","","是 + Color + 的 + Noun"],
  ["后面","hòumiàn","noun","back, behind","教室后面有树。","","","Place + 后面 + 有 + Noun"],
  ["画","huà","verb/noun","to draw, painting","我会画画。","","","会 + Verb + Object"],
  ["花","huā","verb","to spend (money)","我花钱买书。","","","花 + Money + Verb"],
  ["花","huā","noun","flower","我买了一束花。","","","买 + Number + 束 + 花"],
  ["坏","huài","adjective","bad, broken","这个东西坏了。","","","Subject + Verb + 了"],
  ["回来","huílái","verb","to come back","我明天回来。","","","Time + Verb"],
  ["回去","huíqù","verb","to go back","我回去工作。","","","Verb + Purpose"],
  ["间","jiān","measure word","for rooms","我有一间房。","","","Number + 间 + Room"],
  ["教","jiāo","verb","to teach","她教中文。","","","教 + Subject"],
  ["教室","jiàoshì","noun","classroom","我们在教室学习。","","","在 + Place + Verb"],
  ["机场","jīchǎng","noun","airport","我去机场。","","","去 + Place"],
  ["记得","jìde","verb","to remember","我记得你。","","","记得 + Object"],
  ["介绍","jièshào","verb","to introduce","请介绍一下自己。","","","Verb + 一下"],
  ["进","jìn","verb","to enter","我进房间。","","","进 + Place"],
  ["近","jìn","adjective","close, near","家离学校很近。","","","A + 离 + B + 很 + Adjective"],
  ["经常","jīngcháng","adverb","often","我经常去那里。","","","Subject + 经常 + Verb"],
  ["进来","jìnlái","verb","to come in","请进来。","","","Directional complement"],
  ["进去","jìnqù","verb","to go in","我进去看看。","","","Verb + Purpose"],
  ["机票","jīpiào","noun","plane ticket","我买了机票。","","","买 + 了 + Noun"],
  ["就","jiù","adverb","just, then","我就要走了。","","","就 + 要 + Verb + 了"],
  ["酒店","jiǔdiàn","noun","hotel","我住在酒店。","","","住 + 在 + Place"],
  ["咖啡","kāfēi","noun","coffee","我喝咖啡。","","","喝 + Beverage"],
  ["开始","kāishǐ","verb/noun","to start, beginning","我们开始吧。","","","Verb + 吧 = Suggestion"],
  ["开学","kāixué","verb","school starts","明天开学。","","","Time + Verb"],
  ["考","kǎo","verb","to take a test","我要考试。","","","要 + Verb"],
  ["考试","kǎoshì","verb/noun","exam, to test","我通过了考试。","","","通过 + Noun"],
  ["可能","kěnéng","verb/adj","maybe, possible","我可能去。","","","Subject + 可能 + Verb"],
  ["快","kuài","adjective/adv","fast, quickly","他跑得快。","","","Verb + 得 + 快"],
  ["快乐","kuàilè","adjective","happy","我很快乐。","","","很 + Adjective"],
  ["快要","kuàiyào","adverb","about to","我快要到了。","","","快要 + Verb + 了"],
  ["裤子","kùzi","noun","pants, trousers","我穿裤子。","","","穿 + Clothing"],
  ["篮球","lánqiú","noun","basketball","我打篮球。","","","打 + Ball Sport"],
  ["累","lèi","adjective","tired","我累了。","","","Subject + Adjective + 了"],
  ["离","lí","preposition","from (distance)","我家离学校近。","","","Place1 + 离 + Place2 + Adjective"],
  ["里面","lǐmiàn","noun","inside","盒子里面有糖。","","","Place + 里面 + 有 + Noun"],
  ["楼","lóu","noun","building, floor","我在二楼。","","","在 + Number + 楼"],
  ["路","lù","noun","road, way","路上有车。","","","Place + 上 + 有 + Noun"],
  ["绿茶","lǜchá","noun","green tea","我喝绿茶。","","","喝 + Beverage"],
  ["绿色","lǜsè","noun","green color","绿色是我的颜色。","","","Color + 是 + Possessive"],
  ["路上","lùshàng","adverb","on the way","我路上听音乐。","","","Subject + 路上 + Verb"],
  ["旅游","lǚyóu","verb/noun","to travel","我喜欢旅游。","","","喜欢 + Verb"],
  ["慢","màn","adjective","slow","他走得慢。","","","Verb + 得 + 慢"],
  ["每","měi","pronoun","every","我每天学习。","","","每 + Time Word + Verb"],
  ["没意思","méiyìsi","adjective","boring","这个游戏没意思。","","","Subject + 没意思"],
  ["门","mén","noun","door, gate","我关门。","","","Verb + 门"],
  ["门口","ménkǒu","noun","doorway, entrance","门口有人。","","","Place + 有 + Noun"],
  ["门票","ménpiào","noun","entrance ticket","我买了门票。","","","买 + 了 + Noun"],
  ["面","miàn","noun/suffix","noodles, side","我吃牛肉面。","","","Food + 面"],
  ["名","míng","noun/measure","name, (for people)","他是一名老师。","","","是 + Number + 名 + Occupation"],
  ["拿","ná","verb","to take, hold","我拿我的包。","","","拿 + Object"],
  ["奶茶","nǎichá","noun","milk tea","我喜欢奶茶。","","","喜欢 + Beverage"],
  ["奶奶","nǎinai","noun","grandmother","我奶奶很好。","","","Family term"],
  ["那么","nàme","adv/conj","so, then","那么，我们走吧。","","","Transition word"],
  ["男孩儿","nánháir","noun","boy","他是男孩儿。","","","Subject + 是 + Gender"],
  ["那样","nàyàng","pronoun","that way","我不喜欢那样。","","","不喜欢 + Demonstrative"],
  ["鸟","niǎo","noun","bird","天上有鸟。","","","Place + 有 + Noun"],
  ["女孩儿","nǚháir","noun","girl","她是女孩儿。","","","Subject + 是 + Gender"],
  ["旁边","pángbiān","noun","beside, next to","学校旁边有公园。","","","Place + 旁边 + 有 + Noun"],
  ["跑","pǎo","verb","to run","我跑步。","","","Verb + Object"],
  ["跑步","pǎobù","verb/noun","to run, jogging","我喜欢跑步。","","","喜欢 + Activity"],
  ["票","piào","noun","ticket","我有一张票。","","","Number + 张 + 票"],
  ["前面","qiánmiàn","noun","front","教室前面有黑板。","","","Place + 前面 + 有 + Noun"],
  ["起来","qǐlái","verb","to get up","我早上7点起来。","","","Time + Verb"],
  ["晴","qíng","adjective","sunny","今天是晴天。","","","是 + Adjective + 天"],
  ["球","qiú","noun","ball","我玩球。","","","玩 + Object"],
  ["妻子","qīzi","noun","wife","她是我的妻子。","","","Possession: 的"],
  ["让","ràng","verb","to let, make","让我看看。","","","让 + Person + Verb"],
  ["肉","ròu","noun","meat","我吃肉。","","","吃 + Food"],
  ["商场","shāngchǎng","noun","mall, shopping center","我去商场购物。","","","去 + Place + Purpose"],
  ["上来","shànglái","verb","to come up","请上来。","","","Directional complement"],
  ["上面","shàngmiàn","noun","above, on top","桌子上面有书。","","","Place + 上面 + 有 + Noun"],
  ["上去","shàngqù","verb","to go up","我上去拿东西。","","","Verb + Purpose"],
  ["上网","shàngwǎng","verb","to go online","我喜欢上网。","","","喜欢 + Activity"],
  ["生日","shēngrì","noun","birthday","今天是我的生日。","","","是 + Possessive + Noun"],
  ["身体","shēntǐ","noun","body, health","我身体很好。","","","Subject + 身体 + 很 + Adjective"],
  ["时","shí","noun","time","现在是三点。","","","Time expression"],
  ["事情","shìqing","noun","matter, thing","我有一件事情。","","","有 + Number + 件 + Noun"],
  ["手","shǒu","noun","hand","这是我的手。","","","是 + Possessive + Noun"],
  ["手表","shǒubiǎo","noun","wristwatch","我有一块手表。","","","Number + 块 + 手表"],
  ["书包","shūbāo","noun","schoolbag","我背着书包。","","","背 + 着 + Noun"],
  ["舒服","shūfu","adjective","comfortable","这椅子很舒服。","","","Subject + 很 + Adjective"],
  ["送","sòng","verb","to send, give","我送你礼物。","","","送 + Person + Object"],
  ["虽然","suīrán","conjunction","although","虽然累，但是我要走。","","","虽然 + Clause + 但是 + Clause"],
  ["所以","suǒyǐ","conjunction","so, therefore","我很忙，所以没空。","","","Clause + 所以 + Clause"],
  ["疼","téng","verb/adj","to hurt, painful","我头疼。","","","Body Part + 疼"],
  ["题","tí","noun","question, problem","我会做这道题。","","","会 + Verb + Number + 道 + 题"],
  ["踢","tī","verb","to kick","我踢球。","","","踢 + Ball"],
  ["条","tiáo","measure word","for long objects","一条鱼。","","","Number + 条 + Noun"],
  ["跳舞","tiàowǔ","verb/noun","to dance","我喜欢跳舞。","","","喜欢 + Activity"],
  ["头","tóu","noun","head","我头疼。","","","Body Part + 疼"],
  ["外国","wàiguó","noun","foreign country","我想去外国。","","","想 + Verb + Place"],
  ["外面","wàimiàn","noun","outside","外面冷。","","","Place + Adjective"],
  ["完","wán","verb","to finish","我做完作业了。","","","Verb + 完 = Completion"],
  ["万","wàn","numeral","ten thousand","我有一万元。","","","Number + 万"],
  ["忘","wàng","verb","to forget","我忘带钥匙了。","","","忘 + Verb + Object + 了"],
  ["往","wǎng","preposition","toward","我往前走。","","","往 + Direction + Verb"],
  ["网上","wǎngshàng","noun","online","我在网上买东西。","","","在 + 网上 + Verb"],
  ["位","wèi","measure word","polite for people","这位是老师。","","","这 + 位 + Noun"],
  ["为什么","wèishénme","pronoun","why","你为什么迟到？","","","为什么 + Verb"],
  ["洗","xǐ","verb","to wash","我洗衣服。","","","洗 + Object"],
  ["下来","xiàlái","verb","to come down","我从车上下来。","","","从 + Place + 下来"],
  ["下面","xiàmiàn","noun","below, under","桌子下面有猫。","","","Place + 下面 + 有 + Noun"],
  ["笑","xiào","verb","to laugh, smile","我笑了。","","","Subject + Verb + 了"],
  ["小孩儿","xiǎoháir","noun","child","小孩儿很可爱。","","","Subject + 很 + Adjective"],
  ["小时候","xiǎoshíhou","noun","childhood","我小时候喜欢画画。","","","Time + Subject + Verb"],
  ["下去","xiàqù","verb","to go down","我从楼上下去。","","","从 + Place + 下去"],
  ["姓","xìng","verb/noun","surname, to be surnamed","我姓李。","","","Subject + 姓 + Surname"],
  ["姓名","xìngmíng","noun","full name","请问你的姓名？","","","Possession: 的"],
  ["洗手间","xǐshǒujiān","noun","restroom, bathroom","厕所在哪里？","","","Place + 在 + 哪里"],
  ["希望","xīwàng","verb/noun","to hope, wish","我希望你快乐。","","","希望 + Clause"],
  ["眼睛","yǎnjīng","noun","eye","我的眼睛很大。","","","Body Part + 很 + Adjective"],
  ["颜色","yánsè","noun","color","我喜欢蓝色。","","","喜欢 + Color"],
  ["药","yào","noun","medicine","我要吃药。","","","吃 + Medicine"],
  ["药店","yàodiàn","noun","pharmacy","我去药店买药。","","","去 + Place + Purpose"],
  ["爷爷","yéye","noun","grandfather","我爷爷很健康。","","","Family term + 很 + Adjective"],
  ["一会儿","yíhuìr","time word","a little while","我等你一会儿。","","","Verb + 一会儿"],
  ["已经","yǐjīng","adverb","already","我已经吃完饭了。","","","已经 + Verb + 了"],
  ["阴","yīn","adjective","cloudy","今天是阴天。","","","是 + Adjective + 天"],
  ["因为","yīnwèi","conjunction","because","因为下雨，我没出门。","","","因为 + Clause + Result"],
  ["一起","yìqǐ","adverb","together","我们一起去公园。","","","Subject + 一起 + Verb"],
  ["意思","yìsi","noun","meaning","这个词是什么意思？","","","Noun + 是 + 什么 + 意思"],
  ["游","yóu","verb","to swim","我会游泳。","","","会 + Verb"],
  ["右","yòu","noun","right","请向右转。","","","向 + Direction + Verb"],
  ["有意思","yǒuyìsi","adjective","interesting","这本书很有意思。","","","Subject + 很 + 有意思"],
  ["右边","yòubiān","noun","right side","银行在右边。","","","Place + 在 + Direction"],
  ["有时(候)","yǒushí(hòu)","adverb","sometimes","我有时去跑步。","","","Subject + 有时 + Verb"],
  ["游泳","yóuyǒng","verb/noun","to swim","我喜欢游泳。","","","喜欢 + Activity"],
  ["鱼","yú","noun","fish","我吃鱼。","","","吃 + Food"],
  ["远","yuǎn","adjective","far","学校离我家很远。","","","A + 离 + B + 很 + Adjective"],
  ["运动","yùndòng","verb/noun","to exercise, sports","我每天运动。","","","Time + Verb"],
  ["站","zhàn","noun","stop, station","公交车站在前面。","","","Place + 在 + Location"],
  ["丈夫","zhàngfu","noun","husband","他是我的丈夫。","","","Possession: 的"],
  ["着","zhe","particle","progressive particle","我看着书。","","","Verb + 着 = Ongoing action"],
  ["这么","zhème","pronoun","so, this way","你怎么这么晚？","","","这么 + Adjective"],
  ["正","zhèng","adverb","just, exactly","我正吃饭呢。","","","正 + Verb + 呢 = In progress"],
  ["这样","zhèyàng","pronoun","this way","我喜欢这样的生活。","","","这样 + 的 + Noun"],
  ["周","zhōu","noun/measure","week","我一周上五天课。","","","Number + 周 + Verb"],
  ["准备","zhǔnbèi","verb","to prepare","我准备考试。","","","准备 + Object"],
  ["自己","zìjǐ","pronoun","oneself","我自己做饭。","","","Subject + 自己 + Verb"],
  ["走","zǒu","verb","to walk, go","我走路去学校。","","","走 + Route + Purpose"],
  ["走路","zǒulù","verb/noun","to walk","我喜欢走路。","","","喜欢 + Activity"],
  ["最","zuì","adverb","most","我最喜欢苹果。","","","最 + Verb/Adjective"],
  ["左","zuǒ","noun","left","请向左转。","","","向 + Direction + Verb"],
  ["左边","zuǒbiān","noun","left side","学校在左边。","","","Place + 在 + Direction"],
  ["足球","zúqiú","noun","football, soccer","我喜欢踢足球。","","","踢 + Ball Sport"]
],
"3": [
  ["矮","ǎi","adjective","short (height)","我弟弟很矮，他比我小三岁。","......","......","Subject + 很 + Adjective"],
  ["爱人","àirén","noun","spouse, husband/wife","这是我的爱人，我们结婚五年了。","......","......","Possession: 的 + Noun"],
  ["安静","ānjìng","adjective","quiet, peaceful","图书馆很安静，请大家小声说话。","......","......","Place + 很 + Adjective"],
  ["安全","ānquán","adjective","safe, secure","晚上一个人走路不安全。","......","......","Subject + 不 + Adjective"],
  ["阿姨","āyí","noun","aunt,阿姨","这位阿姨是我妈妈的妹妹。","......","......","这 + 位 + Noun"],
  ["把","bǎ","preposition","(disposal marker)","请把门打开，房间里太热了。","......","......","把 + Object + Verb + Complement"],
  ["办","bàn","verb","to do, handle","我去银行办一张信用卡。","......","......","去 + Place + 办 + Object"],
  ["搬","bān","verb","to move","我们下个月搬家，搬到市中心。","......","......","Subject + 搬 + Place"],
  ["办法","bànfǎ","noun","way, method","我有办法解决这个问题。","......","......","有 + 办法 + Verb"],
  ["办公室","bàngōngshì","noun","office","他在办公室开会，现在不能接电话。","......","......","在 + Place + Verb"],
  ["帮助","bāngzhù","verb/noun","to help, help","谢谢你帮助我学习中文。","......","......","帮助 + Person + Verb"],
  ["班级","bānjí","noun","class, grade","我们班级有二十个学生。","......","......","Possession: 的 + Noun"],
  ["半天","bàntiān","noun","half a day, long time","我等了半天，他才来。","......","......","Verb + 了 + 半天"],
  ["饱","bǎo","adjective","full (stomach)","我吃饱了，不能再吃了。","......","......","Subject + 吃饱 + 了"],
  ["报纸","bàozhǐ","noun","newspaper","爸爸每天早上看报纸。","......","......","看 + Newspaper"],
  ["被","bèi","preposition","passive marker","杯子被我打碎了，对不起。","......","......","Subject + 被 + Agent + Verb"],
  ["北","běi","noun","north","北京在中国的北方。","......","......","Direction + 方 = Area"],
  ["北方","běifāng","noun","northern area","我喜欢北方的冬天，因为会下雪。","......","......","Place + 的 + Noun"],
  ["变","biàn","verb","to change","天气变冷了，多穿点衣服。","......","......","Subject + 变 + Adjective + 了"],
  ["遍","biàn","measure word","time(s) (whole process)","这本书我读了三遍，很有意思。","......","......","Verb + Number + 遍"],
  ["变成","biànchéng","verb","to become","他努力学习，最后变成了一名老师。","......","......","Subject + 变成 + Noun"],
  ["变化","biànhuà","noun/verb","change","这个城市变化很大，我都不认识了。","......","......","Subject + 变化 + Adjective"],
  ["表演","biǎoyǎn","verb/noun","to perform, performance","她喜欢在舞台上表演舞蹈。","......","......","喜欢 + Verb"],
  ["别的","biéde","pronoun","other, else","我没有别的事了，你可以走了。","......","......","没有 + 别的 + Noun"],
  ["别人","biérén","noun","other people, others","不要看别人，自己认真做题。","......","......","Verb + 别人"],
  ["笔记","bǐjì","noun","notes","上课要记得记笔记。","......","......","记 + 笔记"],
  ["比较","bǐjiào","adverb","comparatively, quite","他比较高，有一米八。","......","......","Subject + 比较 + Adjective"],
  ["笔记本","bǐjìběn","noun","notebook, laptop","我用笔记本写日记。","......","......","用 + Tool + Verb"],
  ["冰","bīng","noun","ice","水冻成冰了。","......","......","Noun + 成 + Noun"],
  ["冰激凌","bīngjílíng","noun","ice cream","夏天我喜欢吃冰激凌。","......","......","吃 + Food"],
  ["病人","bìngrén","noun","patient, sick person","医生正在看病人。","......","......","Verb + Object"],
  ["宾馆","bīnguǎn","noun","hotel","我们来北京旅游，住在一家宾馆。","......","......","住 + 在 + Place"],
  ["冰箱","bīngxiāng","noun","refrigerator","牛奶在冰箱里，你拿一下。","......","......","Place + 里"],
  ["比如","bǐrú","verb/conj","for example","我喜欢运动，比如跑步和游泳。","......","......","比如 + Examples"],
  ["比赛","bǐsài","noun/verb","match, competition","我们明天有一场足球比赛。","......","......","有 + Number + 场 + 比赛"],
  ["必须","bìxū","adverb","must, have to","你必须好好学习，才能通过考试。","......","......","Subject + 必须 + Verb"],
  ["不同","bùtóng","adjective","different","我们的想法不同，但是可以做朋友。","......","......","A + 和 + B + 不同"],
  ["不但","bùdàn","conjunction","not only","他不但高，而且很帅。","......","......","不但 + Clause + 而且 + Clause"],
  ["不见","bùjiàn","verb","not see, disappear","我不见他很久了，他去哪儿了？","......","......","不见 + Duration"],
  ["不久","bùjiǔ","adverb","soon, not long after","他走了不久，我就回来了。","......","......","Time + 不久 + Clause"],
  ["不行","bùxíng","adjective","not okay, not allowed","这样做不行，会被老师批评的。","......","......","Subject + 不行"],
  ["不用","bùyòng","adverb","need not","你不用来我家，我自己去就行。","......","......","Subject + 不用 + Verb"],
  ["才","cái","adverb","only then, just","他十点才起床，太晚了。","......","......","Time + 才 + Verb"],
  ["菜单","càidān","noun","menu","请给我看一下菜单。","......","......","Verb + 一下 + Object"],
  ["参加","cānjiā","verb","to join, attend","我想参加学校的篮球队。","......","......","参加 + Activity/Group"],
  ["草","cǎo","noun","grass","草地上有很多花。","......","......","Place + 上"],
  ["草地","cǎodì","noun","lawn, grassland","孩子们在草地上玩游戏。","......","......","在 + Place + Verb"],
  ["层","céng","measure word","floor, layer","我住在三层，没有电梯。","......","......","Number + 层"],
  ["查","chá","verb","to check, look up","我查字典，看看这个词的意思。","......","......","查 + Object"],
  ["差","chà","verb/adjective","to differ, bad","我和他差一岁，他比我大。","......","......","A + 和 + B + 差 + Number"],
  ["差不多","chàbuduō","adverb","almost, nearly","我们差不多高，他比我高一点。","......","......","Subject + 差不多 + Adjective"],
  ["尝","cháng","verb","to taste","你尝一尝这个菜，很好吃。","......","......","Verb + 一 + Verb"],
  ["常","cháng","adverb","often","我常去那家咖啡店。","......","......","Subject + 常 + Verb"],
  ["常见","chángjiàn","adjective","common","这种鸟在城市里很常见。","......","......","Subject + 很 + 常见"],
  ["常用","chángyòng","adjective","commonly used","这是中文的常用词，你要记住。","......","......","是 + Adjective + 的 + Noun"],
  ["常常","chángcháng","adverb","often, frequently","他常常迟到，老师不高兴。","......","......","Subject + 常常 + Verb"],
  ["成绩","chéngjì","noun","grade, score","我的考试成绩很好。","......","......","Possession: 的 + Noun"],
  ["城市","chéngshì","noun","city","北京是一个很大的城市。","......","......","是 + Adjective + 的 + Noun"],
  ["衬衫","chènshān","noun","shirt","我穿了一件白衬衫。","......","......","穿 + Number + 件 + Clothing"],
  ["迟到","chídào","verb","to be late","因为堵车，我今天迟到了。","......","......","Subject + 迟到 + 了"],
  ["船","chuán","noun","boat, ship","我们坐船去岛上玩。","......","......","坐 + Transportation"],
  ["出发","chūfā","verb","to depart, set out","我们明天早上八点出发。","......","......","Time + Verb"],
  ["除了","chúle","preposition","except, besides","除了我，大家都去公园了。","......","......","除了 + Noun + 都 + Verb"],
  ["春天","chūntiān","noun","spring","春天到了，花儿开了。","......","......","Season + 到了"],
  ["出生","chūshēng","verb","to be born","我出生在一个小城市。","......","......","出生 + 在 + Place"],
  ["出现","chūxiàn","verb","to appear","他突然出现在我面前。","......","......","Subject + 出现 + 在 + Place"],
  ["厨房","chúfáng","noun","kitchen","妈妈在厨房做饭。","......","......","在 + Place + Verb"],
  ["穿","chuān","verb","to wear, put on","今天冷，多穿点衣服。","......","......","穿 + Clothing"],
  ["窗户","chuānghu","noun","window","请把窗户打开，房间太闷了。","......","......","把 + Object + Verb + Complement"],
  ["床","chuáng","noun","bed","我累了，想躺在床上休息。","......","......","躺 + 在 + Place + 上"],
  ["春节","chūnjié","noun","Spring Festival","春节我们一家人一起吃饭。","......","......","Time + Subject + Verb"],
  ["词典","cídiǎn","noun","dictionary","我用手机词典查单词。","......","......","用 + Tool + Verb"],
  ["此","cǐ","pronoun","this","此人是我最好的朋友。","......","......","此 + Noun"],
  ["次","cì","measure word","time(s)","我去过三次上海。","......","......","Verb + 过 + Number + 次"],
  ["从","cóng","preposition","from","我从家走到学校需要二十分钟。","......","......","从 + Place + Verb"],
  ["聪明","cōngming","adjective","smart, intelligent","这个孩子很聪明，学习很好。","......","......","Subject + 很 + Adjective"],
  ["错","cuò","adjective","wrong","这道题我做错了。","......","......","Verb + 错 + 了"],
  ["答应","dāying","verb","to promise, agree","我答应你明天早点来。","......","......","答应 + Person + Clause"],
  ["打","dǎ","verb","to hit, play, make","我每天打篮球。","......","......","打 + Ball Sport"],
  ["打电话","dǎ diànhuà","verb phrase","to make a phone call","我晚上给你打电话。","......","......","给 + Person + 打电话"],
  ["大家","dàjiā","pronoun","everyone","大家好，我叫李明。","......","......","Greeting + 大家"],
  ["大","dà","adjective","big, large","这个房子很大，有五个房间。","......","......","Subject + 很 + Adjective"],
  ["大概","dàgài","adverb","probably, approximately","现在大概三点钟。","......","......","Time + 大概 + Number"],
  ["当然","dāngrán","adverb","of course","当然可以，没问题。","......","......","当然 + Adjective/Verb"],
  ["刀","dāo","noun","knife","用刀切水果要小心。","......","......","用 + Tool + Verb"],
  ["到","dào","verb","to arrive, reach","我到学校了，马上上课。","......","......","到 + Place + 了"],
  ["道","dào","measure word","for questions, orders","我有两道题不会做。","......","......","Number + 道 + Noun"],
  ["得","de","particle","complement particle","他跑得很快。","......","......","Verb + 得 + Adjective"],
  ["等","děng","verb","to wait","请等我一下，我马上来。","......","......","等 + Person + Time"],
  ["低","dī","adjective","low","飞机飞得很低。","......","......","Verb + 得 + 很 + 低"],
  ["地方","dìfang","noun","place","这是什么地方？很美。","......","......","是 + Question Word + Noun"],
  ["电话","diànhuà","noun","telephone, phone call","我打了一个电话给妈妈。","......","......","Verb + 了 + Number + 个 + Noun"],
  ["电脑","diànnǎo","noun","computer","我用电脑工作。","......","......","用 + Tool + Verb"],
  ["点","diǎn","noun/verb","o'clock, point, to order","现在三点，我饿了。","......","......","Number + 点"],
  ["点心","diǎnxīn","noun","snack, dim sum","我下午吃了一点心。","......","......","吃 + 了 + 点心"],
  ["电","diàn","noun","electricity","这里没电了，灯不亮。","......","......","没 + Noun"],
  ["电影","diànyǐng","noun","movie, film","我们周末去看电影吧。","......","......","去 + Place + 看 + Movie"],
  ["东西","dōngxi","noun","thing, object","我买了很多东西。","......","......","Verb + 了 + 很多 + Noun"],
  ["冬天","dōngtiān","noun","winter","冬天很冷，要多穿衣服。","......","......","Season + 很 + Adjective"],
  ["懂","dǒng","verb","to understand","我懂你的意思。","......","......","懂 + Object"],
  ["都","dōu","adverb","all, both","我们都很喜欢中文老师。","......","......","Subject + 都 + Verb"],
  ["读","dú","verb","to read","我每天读中文书。","......","......","Time + Verb + Object"],
  ["肚子","dǔzi","noun","stomach, belly","我肚子饿了，想吃东西。","......","......","Body Part + 饿了/疼了"],
  ["短","duǎn","adjective","short","这条裤子太短了。","......","......","Subject + 太 + Adjective + 了"],
  ["段","duàn","measure word","paragraph, section","这段话是什么意思？","......","......","这 + 段 + Noun"],
  ["对","duì","adjective","correct, right","你说得对，我错了。","......","......","Verb + 得 + 对"],
  ["多","duō","adjective","many, much","我有很多朋友。","......","......","很多 + Noun"],
  ["多少","duōshao","pronoun","how many, how much","这个苹果多少钱？","......","......","Noun + 多少 + Question"],
  ["饿","è","adjective","hungry","我饿了，我们吃饭吧。","......","......","Subject + 饿了"],
  ["儿","ér","noun","son, child","他是我儿子。","......","......","Possession: 的"],
  ["耳朵","ěrduo","noun","ear","我的耳朵很灵敏。","......","......","Body Part + 很 + Adjective"],
  ["二","èr","numeral","two","我有二个苹果。","......","......","Use 两 with measure words"],
  ["发","fā","verb","to send, emit","我给你发了一条微信。","......","......","给 + Person + 发 + Object"],
  ["法国","Fǎguó","noun","France","他去年去了法国旅游。","......","......","去 + Country + Verb"],
  ["饭","fàn","noun","meal, cooked rice","我吃晚饭了。","......","......","吃 + Meal"],
  ["方便","fāngbiàn","adjective","convenient","住在这里很方便，旁边就是地铁站。","......","......","Place + 很 + 方便"],
  ["房间","fángjiān","noun","room","我的房间不大，但是很舒服。","......","......","Possession: 的 + Noun"],
  ["方法","fāngfǎ","noun","method, way","学习要有正确的方法。","......","......","有 + Adjective + 的 + Noun"],
  ["放","fàng","verb","to put, place","请把书放在桌子上。","......","......","把 + Object + 放 + 在 + Place"],
  ["非常","fēicháng","adverb","very, extremely","我非常喜欢中国菜。","......","......","非常 + Verb/Adjective"],
  ["飞","fēi","verb","to fly","鸟会飞，人不会。","......","......","Subject + 会 + Verb"],
  ["飞机","fēijī","noun","airplane","我坐飞机去上海。","......","......","坐 + Transportation"],
  ["分钟","fēnzhōng","measure word","minute","我等你十分钟。","......","......","Number + 分钟"],
  ["份","fèn","measure word","portion, copy","我点了一份牛肉面。","......","......","Number + 份 + Food"],
  ["风","fēng","noun","wind","今天风很大，有点冷。","......","......","Weather + 很 + Adjective"],
  ["朋友","péngyou","noun","friend","他是我最好的朋友。","......","......","Possession: 的 + Noun"],
  ["衣服","yīfu","noun","clothes","我买了一件新衣服。","......","......","买 + Number + 件 + Clothing"],
  ["服","fú","noun/verb","clothes, to obey","他不服老师的批评。","......","......","不 + Verb"],
  ["父","fù","noun","father","父亲节快乐！","......","......","Noun + 节"],
  ["父亲","fùqīn","noun","father","我的父亲是一名医生。","......","......","Possession: 的 + Noun"],
  ["复习","fùxí","verb","to review","我每天晚上复习功课。","......","......","Time + Verb + Object"],
  ["干净","gānjìng","adjective","clean","这个房间很干净。","......","......","Subject + 很 + Adjective"],
  ["高兴","gāoxìng","adjective","happy, glad","我很高兴认识你。","......","......","很 + Adjective"],
  ["哥","gē","noun","elder brother","我哥比我大三岁。","......","......","Family term"],
  ["哥哥","gēge","noun","elder brother","哥哥在银行工作。","......","......","Family term + Verb"],
  ["歌","gē","noun","song","我唱一首歌给你听。","......","......","Verb + Number + 首 + 歌"],
  ["唱歌","chànggē","verb phrase","to sing","我喜欢唱歌和跳舞。","......","......","喜欢 + Activities"],
  ["个","gè","measure word","general measure","我有一个妹妹。","......","......","Number + 个 + Noun"],
  ["各","gè","pronoun","each, every","各个地方都有自己的特色。","......","......","各 + Reduplicated Noun"],
  ["给","gěi","verb/prep","to give, for","我给你一本书。","......","......","给 + IO + DO"],
  ["更","gèng","adverb","more, even more","今天比昨天更冷。","......","......","A + 比 + B + 更 + Adjective"],
  ["工作","gōngzuò","verb/noun","to work, job","我在一家公司工作。","......","......","在 + Place + Verb"],
  ["公园","gōngyuán","noun","park","我们周末去公园散步。","......","......","去 + Place + Verb"],
  ["公共","gōnggòng","adjective","public","公共汽车站就在前面。","......","......","Adjective + Noun"],
  ["公司","gōngsī","noun","company","他在一家外国公司上班。","......","......","在 + Place + Verb"],
  ["故事","gùshi","noun","story","妈妈给我讲了一个故事。","......","......","给 + Person + 讲 + 故事"],
  ["狗","gǒu","noun","dog","我家有一只小狗。","......","......","有 + Number + 只 + Animal"],
  ["果","guǒ","noun","fruit","水果对身体好。","......","......","Noun + 对 + Noun + 好"],
  ["过去","guòqù","noun/verb","past, to go over","过去的事就让它过去吧。","......","......","过去 + 的 + Noun"],
  ["孩子","háizi","noun","child, kid","这个孩子很聪明。","......","......","Subject + 很 + Adjective"],
  ["海","hǎi","noun","sea, ocean","我从来没看过海。","......","......","看 + 过 + Noun"],
  ["好","hǎo","adjective","good, well","这本书很好。","......","......","Subject + 很 + Adjective"],
  ["好吃","hǎochī","adjective","delicious","妈妈做的饭很好吃。","......","......","Subject + 很 + Adjective"],
  ["号","hào","noun","number, date","今天几号？","......","......","Question: 几号"],
  ["喝","hē","verb","to drink","我每天喝八杯水。","......","......","Time + Verb + Quantity"],
  ["和","hé","conjunction","and, with","我和朋友一起去。","......","......","Noun + 和 + Noun"],
  ["河","hé","noun","river","一条河从城市中间流过。","......","......","Number + 条 + 河"],
  ["黑","hēi","adjective","black, dark","外面很黑，小心点。","......","......","Place + 很 + Adjective"],
  ["很","hěn","adverb","very","她很高。","......","......","很 + Adjective"],
  ["红","hóng","adjective","red","我喜欢红色的花。","......","......","Color + 的 + Noun"],
  ["后面","hòumian","noun","behind, back","教室后面有一个花园。","......","......","Place + 后面 + 有 + Noun"],
  ["湖","hú","noun","lake","湖边有很多人在钓鱼。","......","......","Place + 边"],
  ["花","huā","noun/verb","flower, to spend","这朵花很漂亮。","......","......","Number + 朵 + 花"],
  ["画","huà","verb/noun","to draw, painting","他画了一幅画。","......","......","Verb + 了 + Number + 幅 + Noun"],
  ["话","huà","noun","words, speech","你说的话我听不懂。","......","......","Subject + Verb + 的 + 话"],
  ["坏","huài","adjective","bad, broken","我的手机坏了，需要修。","......","......","Subject + Verb + 了"],
  ["还","hái","adverb","still, also","我还没吃饭。","......","......","还 + 没 + Verb"],
  ["换","huàn","verb","to change, exchange","我想换一个手机。","......","......","想 + Verb + Object"],
  ["回","huí","verb","to return","我每天下午五点回家。","......","......","Time + 回 + Place"],
  ["会","huì","verb","can, will, meeting","我会说三种语言。","......","......","会 + Verb"],
  ["活","huó","verb","to live","活着就要快乐。","......","......","Verb + 着"],
  ["火","huǒ","noun","fire","小心火！","......","......","Verb + Noun"],
  ["或","huò","conjunction","or","喝茶或咖啡都可以。","......","......","Noun + 或 + Noun"],
  ["机","jī","noun","machine","手机是现代人离不开的东西。","......","......","Noun + Compound"],
  ["鸡","jī","noun","chicken","一只鸡在院子里跑。","......","......","Number + 只 + Animal"],
  ["几","jǐ","pronoun","how many (1-10)","你有几个兄弟姐妹？","......","......","几 + Measure Word"],
  ["家","jiā","noun","home, family","我家有五口人。","......","......","Possession + 家"],
  ["家人","jiārén","noun","family member","我的家人都很健康。","......","......","Possession: 的 + Noun"],
  ["家庭","jiātíng","noun","family","幸福的家庭都很相似。","......","......","Adjective + 的 + Noun"],
  ["假","jià","noun","vacation, holiday","放暑假了，我们很开心。","......","......","放 + Noun"],
  ["间","jiān","measure word","for rooms","我租了一间房。","......","......","Number + 间 + Noun"],
  ["见","jiàn","verb","to see, meet","我们明天见。","......","......","Time + 见"],
  ["件","jiàn","measure word","for clothes, matters","我买了一件新衣服。","......","......","Number + 件 + Noun"],
  ["健康","jiànkāng","adjective/noun","healthy, health","祝你身体健康！","......","......","Wish + 身体 + 健康"],
  ["讲","jiǎng","verb","to speak, talk","老师讲课很有意思。","......","......","Subject + Verb + Object"],
  ["教","jiāo","verb","to teach","王老师教我们中文。","......","......","Person + 教 + Person + Subject"],
  ["教室","jiàoshì","noun","classroom","我们在教室上课。","......","......","在 + Place + Verb"],
  ["姐","jiě","noun","elder sister","我姐是大学生。","......","......","Family term + 是 + Noun"],
  ["姐姐","jiějie","noun","elder sister","姐姐比我大两岁。","......","......","Family term + 比 + Pronoun + Adjective"],
  ["借","jiè","verb","to borrow, lend","我可以借你的书吗？","......","......","可以 + Verb + Object + 吗"],
  ["今天","jīntiān","noun","today","今天天气很好。","......","......","Topic + Comment"],
  ["金","jīn","noun","gold","这块手表是金色的。","......","......","是 + Color + 的"],
  ["近","jìn","adjective","near, close","我家离学校很近。","......","......","A + 离 + B + 很 + Adjective"],
  ["进","jìn","verb","to enter","请进，别客气。","......","......","Polite command"],
  ["旧","jiù","adjective","old, used","这本旧书很有意思。","......","......","Adjective + Noun"],
  ["就","jiù","adverb","then, exactly","我就来，等一下。","......","......","就 + Verb"],
  ["举","jǔ","verb","to lift, raise","请举手回答问题。","......","......","Verb + Object + Purpose"],
  ["句","jù","measure word","sentence","请写一句话。","......","......","Number + 句 + 话"],
  ["觉得","juéde","verb","to think, feel","我觉得这个电影很好看。","......","......","觉得 + Opinion"],
  ["开","kāi","verb","to open, drive","请开门。","......","......","请 + Verb + Object"],
  ["开始","kāishǐ","verb","to start, begin","我们开始上课吧。","......","......","Subject + 开始 + Verb + 吧"],
  ["看","kàn","verb","to see, watch","我在看电视。","......","......","看 + Visual Content"],
  ["考试","kǎoshì","noun/verb","exam, test","下周有期中考试。","......","......","Time + 有 + Noun"],
  ["课","kè","noun","class, lesson","我们每天有六节课。","......","......","Time + 有 + Number + 节 + 课"],
  ["课本","kèběn","noun","textbook","请打开课本第十页。","......","......","Verb + Object + Location"],
  ["客人","kèrén","noun","guest","家里来了客人。","......","......","Place + Verb + 了 + Noun"],
  ["空","kōng","adjective","empty","这个房间是空的。","......","......","Subject + 是 + Adjective + 的"],
  ["口","kǒu","noun/measure","mouth","我喝了一口水。","......","......","Verb + 了 + Number + 口 + Noun"],
  ["快","kuài","adjective","fast, quick","他跑得很快。","......","......","Verb + 得 + 很 + 快"],
  ["快乐","kuàilè","adjective","happy","祝你生日快乐！","......","......","Wish + Person + Noun + 快乐"],
  ["宽","kuān","adjective","wide","这条路很宽。","......","......","Subject + 很 + Adjective"],
  ["困","kùn","adjective","sleepy","我困了，想睡觉。","......","......","Subject + Adjective + 了"],
  ["辣","là","adjective","spicy, hot","四川菜很辣。","......","......","Place + 菜 + 很 + Adjective"],
  ["来","lái","verb","to come","他明天来我家。","......","......","Time + 来 + Place"],
  ["蓝","lán","adjective","blue","天空很蓝。","......","......","Subject + 很 + Adjective"],
  ["老","lǎo","adjective","old","我爷爷老了。","......","......","Subject + Adjective + 了"],
  ["老师","lǎoshī","noun","teacher","张老师教我们数学。","......","......","Surname + 老师 + Verb"],
  ["乐","lè","adjective","happy","他每天都很快乐。","......","......","很 + Adjective"],
  ["冷","lěng","adjective","cold","今天比昨天冷。","......","......","A + 比 + B + Adjective"],
  ["里","lǐ","noun","inside","书包里有书。","......","......","Place + 里 + 有 + Noun"],
  ["理","lǐ","verb/noun","to manage, reason","我理解你的想法。","......","......","Verb + Object"],
  ["力","lì","noun","power, strength","他没有力气了。","......","......","没有 + Noun + 了"],
  ["立","lì","verb","to stand","请大家站起来。","......","......","Verb + 起来"],
  ["脸","liǎn","noun","face","她脸红了。","......","......","Body Part + Adjective + 了"],
  ["两","liǎng","numeral","two","我有两个苹果。","......","......","两 + Measure Word"],
  ["亮","liàng","adjective","bright","这个灯很亮。","......","......","Subject + 很 + Adjective"],
  ["了","le","particle","completed action","我吃完饭了。","......","......","Verb + Object + 了"],
  ["零","líng","numeral","zero","现在气温零度。","......","......","Number + 度"],
  ["六","liù","numeral","six","我有六个苹果。","......","......","Number + 个 + Noun"],
  ["楼","lóu","noun","building, floor","我住在十楼。","......","......","住 + 在 + Number + 楼"],
  ["路","lù","noun","road, way","这条路很长。","......","......","Number + 条 + 路"],
  ["旅行","lǚxíng","verb/noun","to travel","我喜欢一个人旅行。","......","......","喜欢 + Verb"],
  ["绿","lǜ","adjective","green","春天树叶变绿了。","......","......","Subject + 变 + Adjective + 了"],
  ["买","mǎi","verb","to buy","我买了一本书。","......","......","买 + 了 + Object"],
  ["卖","mài","verb","to sell","这家店卖水果。","......","......","Place + 卖 + Product"],
  ["满","mǎn","adjective","full","这个杯子是满的。","......","......","Subject + 是 + Adjective + 的"],
  ["猫","māo","noun","cat","我家有一只白猫。","......","......","有 + Number + 只 + Animal"],
  ["吗","ma","particle","question particle","你好吗？","......","......","Statement + 吗"],
  ["马","mǎ","noun","horse","他在骑马。","......","......","骑 + Animal"],
  ["吗","ma","particle","question particle","你吃饭了吗？","......","......","Verb + Object + 了 + 吗"],
  ["忙","máng","adjective","busy","最近我很忙。","......","......","Subject + 很 + Adjective"],
  ["毛","máo","noun","hair, fur","这只小狗的毛很软。","......","......","Possession: 的 + Noun"],
  ["没","méi","adverb","not, haven't","我没吃饭。","......","......","没 + Verb"],
  ["没有","méiyǒu","verb","not have","我没有钱。","......","......","Subject + 没有 + Noun"],
  ["美","měi","adjective","beautiful","风景很美。","......","......","Subject + 很 + Adjective"],
  ["美丽","měilì","adjective","beautiful","她长得很美丽。","......","......","Verb + 得 + 很 + Adjective"],
  ["门","mén","noun","door","请关门。","......","......","Verb + 门"],
  ["们","men","suffix","plural marker","我们是学生。","......","......","Pronoun + 们"],
  ["米","mǐ","noun","meter, rice","他身高一米八。","......","......","Number + 米"],
  ["面","miàn","noun","face, side, noodles","我爱吃牛肉面。","......","......","Food + 面"],
  ["民","mín","noun","people","人民是国家的主人。","......","......","Compound noun"],
  ["名","míng","noun/measure","name","他是一名医生。","......","......","是 + Number + 名 + Occupation"],
  ["明天","míngtiān","noun","tomorrow","明天我去北京。","......","......","Time + Subject + Verb"],
  ["母","mǔ","noun","mother","母亲节快乐！","......","......","Noun + 节"],
  ["母亲","mǔqīn","noun","mother","我的母亲很温柔。","......","......","Possession: 的 + Noun"],
  ["拿","ná","verb","to take, hold","请拿好你的东西。","......","......","Verb + Complement + Object"],
  ["哪","nǎ","pronoun","which","你是哪国人？","......","......","哪 + Measure Word + Noun"],
  ["哪里","nǎlǐ","pronoun","where","你住在哪里？","......","......","在 + 哪里"],
  ["那","nà","pronoun","that","那个是我的。","......","......","那 + Measure Word"],
  ["那儿","nàr","pronoun","there","我朋友在那儿。","......","......","Subject + 在 + 那儿"],
  ["呢","ne","particle","question particle","我很好，你呢？","......","......","Topic + 呢"],
  ["能","néng","verb","can, be able","我能帮你吗？","......","......","能 + Verb"],
  ["你","nǐ","pronoun","you","你是老师吗？","......","......","Subject pronoun"],
  ["年","nián","noun","year","今年是2026年。","......","......","Number + 年"],
  ["鸟","niǎo","noun","bird","树上有一只鸟。","......","......","Place + 有 + Number + 只 + Animal"],
  ["牛","niú","noun","cow, ox","牛吃草。","......","......","Subject + Verb + Object"],
  ["女","nǚ","adjective","female","她是女生。","......","......","Gender + 生"],
  ["女儿","nǚ'ér","noun","daughter","他的女儿很可爱。","......","......","Possession: 的 + Noun"],
  ["暖","nuǎn","adjective","warm","天气变暖了。","......","......","Subject + 变 + Adjective + 了"],
  ["怕","pà","verb","to be afraid","我不怕黑。","......","......","怕 + Object"],
  ["旁边","pángbiān","noun","beside, next to","超市在银行旁边。","......","......","Place1 + 在 + Place2 + 旁边"],
  ["跑","pǎo","verb","to run","他跑得很快。","......","......","Verb + 得 + 很 + Adjective"],
  ["朋友","péngyou","noun","friend","他是我的好朋友。","......","......","Possession: 的 + Noun"],
  ["片","piàn","measure word","piece, slice","我吃了一片面包。","......","......","Number + 片 + Noun"],
  ["漂亮","piàoliang","adjective","pretty, beautiful","她很漂亮。","......","......","Subject + 很 + Adjective"],
  ["票","piào","noun","ticket","我买了两张电影票。","......","......","买 + Number + 张 + 票"],
  ["平","píng","adjective","flat, level","这条路很平。","......","......","Subject + 很 + Adjective"],
  ["七","qī","numeral","seven","现在七点。","......","......","Number + 点"],
  ["期","qī","noun","period, term","这个学期快结束了。","......","......","这 + 个 + 学期"],
  ["骑","qí","verb","to ride","他骑自行车上学。","......","......","骑 + Vehicle + Purpose"],
  ["起","qǐ","verb","to get up, rise","我每天早上六点起床。","......","......","Time + Verb"],
  ["气","qì","noun","gas, air","打开窗户，换换空气。","......","......","Verb + Object"],
  ["千","qiān","numeral","thousand","这本书一千页。","......","......","Number + 千"],
  ["前","qián","noun","front, before","教室前面有一块黑板。","......","......","Place + 前面"],
  ["钱","qián","noun","money","我没带钱。","......","......","Subject + 没 + Verb + Noun"],
  ["浅","qiǎn","adjective","shallow","这里的水很浅。","......","......","Subject + 很 + Adjective"],
  ["强","qiáng","adjective","strong","他身体很强壮。","......","......","Subject + 很 + Adjective"],
  ["桥","qiáo","noun","bridge","这座桥很古老。","......","......","Number + 座 + 桥"],
  ["切","qiē","verb","to cut","妈妈在切菜。","......","......","Subject + 在 + Verb + Object"],
  ["亲","qīn","adjective","dear, close","他们是亲人。","......","......","是 + Noun"],
  ["清","qīng","adjective","clear","水很清。","......","......","Subject + 很 + Adjective"],
  ["晴","qíng","adjective","sunny","今天天气很晴。","......","......","Topic + 很 + Adjective"],
  ["请","qǐng","verb","please, invite","请坐。","......","......","请 + Verb"],
  ["秋","qiū","noun","autumn","秋天是收获的季节。","......","......","Season + 是 + Noun"],
  ["球","qiú","noun","ball","我们去打球吧。","......","......","去 + Verb + 球"],
  ["去","qù","verb","to go","我去超市买东西。","......","......","去 + Place + Purpose"],
  ["全","quán","adjective","all, whole","全班同学都来了。","......","......","全 + Noun"],
  ["然","rán","suffix","...ly, but","虽然很累，但是很开心。","......","......","虽然 + Clause + 但是 + Clause"],
  ["让","ràng","verb","to let, allow","让我想一想。","......","......","让 + Person + Verb"],
  ["热","rè","adjective","hot","天气很热。","......","......","Topic + 很 + Adjective"],
  ["人","rén","noun","person, people","教室里有很多人。","......","......","Place + 有 + 很多 + Noun"],
  ["人们","rénmen","noun","people","人们都很开心。","......","......","Subject + 都 + 很 + Adjective"],
  ["认","rèn","verb","to know, recognize","我认出他了。","......","......","Verb + 出 + Object"],
  ["认识","rènshi","verb","to know, meet","很高兴认识你。","......","......","认识 + Person"],
  ["日","rì","noun","sun, day","今天是好日子。","......","......","是 + Adjective + 日子"],
  ["日子","rìzi","noun","day, life","日子过得很快。","......","......","Subject + Verb + 得 + Adjective"],
  ["如","rú","conjunction","if, such as","如果明天下雨，我们就不去。","......","......","如果 + Clause + 就 + Clause"],
  ["如果","rúguǒ","conjunction","if","如果你有时间，来找我玩。","......","......","如果 + Clause + Imperative"],
  ["三","sān","numeral","three","我有三个苹果。","......","......","Number + 个 + Noun"],
  ["色","sè","noun","color","我喜欢这个颜色。","......","......","喜欢 + 这 + 个 + 颜色"],
  ["山","shān","noun","mountain","周末我们去爬山。","......","......","去 + Verb + 山"],
  ["上","shàng","noun/verb","on, up, last","书在桌子上。","......","......","Object + 在 + Place + 上"],
  ["上课","shàngkè","verb phrase","to attend class","我们八点上课。","......","......","Time + Verb Phrase"],
  ["少","shǎo","adjective","few, little","今天人很少。","......","......","Subject + 很 + Adjective"],
  ["谁","shuí","pronoun","who","他是谁？","......","......","Subject + 是 + 谁"],
  ["身","shēn","noun","body","他全身都湿了。","......","......","全 + 身 + 都 + Adjective + 了"],
  ["身体","shēntǐ","noun","body, health","祝你身体健康。","......","......","Wish + 身体 + 健康"],
  ["深","shēn","adjective","deep","海水很深。","......","......","Subject + 很 + Adjective"],
  ["什么","shénme","pronoun","what","你叫什么名字？","......","......","什么 + Noun"],
  ["十分","shífēn","adverb","very, extremely","我十分满意。","......","......","十分 + Adjective"],
  ["时","shí","noun","time","按时上课很重要。","......","......","按 + Time + Verb"],
  ["时间","shíjiān","noun","time","我没有时间。","......","......","Subject + 没有 + Noun"],
  ["食","shí","noun","food","食物很美味。","......","......","Noun + 很 + Adjective"],
  ["使","shǐ","verb","to make, use","这件事使我很难过。","......","......","Subject + 使 + Person + Adjective"],
  ["事","shì","noun","thing, matter","我有事找你。","......","......","Subject + 有 + Noun + Verb + Person"],
  ["是","shì","verb","to be","我是中国人。","......","......","Subject + 是 + Noun"],
  ["室","shì","noun","room","这是会议室。","......","......","是 + Noun"],
  ["手","shǒu","noun","hand","请洗手。","......","......","Verb + 手"],
  ["手机","shǒujī","noun","mobile phone","我用手机拍照。","......","......","用 + Tool + Verb"],
  ["书","shū","noun","book","我在看书。","......","......","在 + Verb + Object"],
  ["书包","shūbāo","noun","schoolbag","我的书包很重。","......","......","Possession: 的 + Noun"],
  ["树","shù","noun","tree","门前有一棵树。","......","......","Place + 有 + Number + 棵 + 树"],
  ["双","shuāng","measure word","pair","我买了一双鞋。","......","......","Number + 双 + Noun"],
  ["水","shuǐ","noun","water","我渴了，想喝水。","......","......","想 + Verb + Object"],
  ["睡","shuì","verb","to sleep","我睡得很好。","......","......","Verb + 得 + 很 + Adjective"],
  ["睡觉","shuìjiào","verb phrase","to sleep","我每天晚上十点睡觉。","......","......","Time + Verb Phrase"],
  ["顺","shùn","adjective","smooth, along","祝你一切顺利。","......","......","Wish + 一切 + Adjective"],
  ["说","shuō","verb","to speak, say","请说中文。","......","......","请 + Verb + Object"],
  ["司","sī","noun","department","他在公司工作。","......","......","在 + Noun + Verb"],
  ["四","sì","numeral","four","我有四个苹果。","......","......","Number + 个 + Noun"],
  ["送","sòng","verb","to send, give","我送她一份礼物。","......","......","送 + Person + Object"],
  ["算","suàn","verb","to calculate","你算一下多少钱。","......","......","Verb + 一下"],
  ["岁","suì","measure word","years old","我二十岁。","......","......","Number + 岁"],
  ["孙","sūn","noun","grandson","他是我的孙子。","......","......","Possession: 的 + Noun"],
  ["所","suǒ","measure word","for houses","一所学校","......","......","Number + 所 + Noun"],
  ["所以","suǒyǐ","conjunction","so, therefore","因为下雨，所以没去。","......","......","因为 + Clause + 所以 + Clause"],
  ["他","tā","pronoun","he, him","他是医生。","......","......","Subject + 是 + Noun"],
  ["她","tā","pronoun","she, her","她是老师。","......","......","Subject + 是 + Noun"],
  ["它","tā","pronoun","it","它是一只猫。","......","......","Subject + 是 + Noun"],
  ["太","tài","adverb","too, very","太好了！","......","......","太 + Adjective + 了"],
  ["谈","tán","verb","to talk","我们谈谈心。","......","......","Verb + Reduplication"],
  ["汤","tāng","noun","soup","我喜欢喝汤。","......","......","喜欢 + Verb + Noun"],
  ["堂","táng","noun","hall","教室在二楼。","......","......","Noun + Location"],
  ["躺","tǎng","verb","to lie down","他躺在床上看书。","......","......","Subject + Verb + 在 + Place"],
  ["套","tào","measure word","set, suit","我买了一套房子。","......","......","Number + 套 + Noun"],
  ["特","tè","adjective","special","今天有特殊情况。","......","......","Adjective + Noun"],
  ["特别","tèbié","adjective/adv","special, especially","这个特别好吃。","......","......","Subject + 特别 + Adjective"],
  ["天","tiān","noun","sky, day","今天天气好。","......","......","Time + Topic + Adjective"],
  ["天气","tiānqì","noun","weather","今天天气很好。","......","......","Topic + 很 + Adjective"],
  ["条","tiáo","measure word","for long objects","一条河","......","......","Number + 条 + Noun"],
  ["听","tīng","verb","to listen","我听音乐。","......","......","听 + Object"],
  ["厅","tīng","noun","hall","客厅很大。","......","......","Noun + 很 + Adjective"],
  ["同","tóng","adjective","same","我们是同学。","......","......","是 + Noun"],
  ["同学","tóngxué","noun","classmate","他是我的同学。","......","......","Possession: 的 + Noun"],
  ["头","tóu","noun","head","我头疼。","......","......","Body Part + 疼"],
  ["图","tú","noun","picture, map","我喜欢画图。","......","......","喜欢 + Verb + Object"],
  ["外","wài","noun","outside","外面很冷。","......","......","Place + 面 + 很 + Adjective"],
  ["完","wán","verb","to finish","我做完了。","......","......","Verb + 完 + 了"],
  ["玩","wán","verb","to play","周末去公园玩。","......","......","Time + 去 + Place + Verb"],
  ["晚","wǎn","adjective","late","今天我来晚了。","......","......","Time + Subject + Verb + 晚了"],
  ["晚上","wǎnshang","noun","evening","晚上我去看电影。","......","......","Time + Subject + Verb"],
  ["万","wàn","numeral","ten thousand","一万元","......","......","Number + 万"],
  ["王","Wáng","noun","king, surname","他姓王。","......","......","Subject + 姓 + Surname"],
  ["往","wǎng","preposition","toward","往前走。","......","......","往 + Direction + Verb"],
  ["忘","wàng","verb","to forget","我忘了带钥匙。","......","......","Verb + 了 + Verb + Object"],
  ["为","wèi","preposition","for","为你高兴。","......","......","为 + Person + Adjective"],
  ["位","wèi","measure word","polite for people","一位老师","......","......","Number + 位 + Noun"],
  ["文","wén","noun","language, writing","他中文很好。","......","......","Subject + Language + 很 + Adjective"],
  ["文化","wénhuà","noun","culture","中国文化很有意思。","......","......","Noun + 很 + Adjective"],
  ["问","wèn","verb","to ask","我问老师问题。","......","......","问 + Person + Object"],
  ["问题","wèntí","noun","question, problem","我有一个问题。","......","......","有 + Number + 个 + 问题"],
  ["我","wǒ","pronoun","I, me","我是学生。","......","......","Subject pronoun"],
  ["我们","wǒmen","pronoun","we, us","我们一起去。","......","......","Pronoun + 们"],
  ["五","wǔ","numeral","five","我有五个苹果。","......","......","Number + 个 + Noun"],
  ["午","wǔ","noun","noon","中午一起吃饭。","......","......","Time + Adverb + Verb"],
  ["物","wù","noun","thing","动物很可爱。","......","......","Noun + 很 + Adjective"],
  ["西","xī","noun","west","西方文化。","......","......","Direction + 方"],
  ["喜欢","xǐhuan","verb","to like","我喜欢你。","......","......","喜欢 + Object"],
  ["下","xià","noun/verb","down, under, next","在床下。","......","......","Place + 下"],
  ["下雨","xiàyǔ","verb phrase","to rain","今天下雨了。","......","......","Time + Verb Phrase + 了"],
  ["先","xiān","adverb","first","你先走。","......","......","Subject + 先 + Verb"],
  ["先生","xiānsheng","noun","Mr., teacher","李先生","......","......","Surname + 先生"],
  ["现","xiàn","noun","now, present","现在几点？","......","......","现在 + Question"],
  ["现在","xiànzài","noun","now","我现在在家。","......","......","Subject + 现在 + Verb"],
  ["相","xiāng","adverb","each other","我们相信你。","......","......","相 + Verb"],
  ["相信","xiāngxìn","verb","to believe","我相信你。","......","......","相信 + Object"],
  ["想","xiǎng","verb","to think, miss","我想你。","......","......","想 + Object"],
  ["小","xiǎo","adjective","small, little","这个很小。","......","......","Subject + 很 + Adjective"],
  ["小心","xiǎoxīn","adjective/verb","careful","小心路滑。","......","......","小心 + Noun"],
  ["校","xiào","noun","school","学校很大。","......","......","Noun + 很 + Adjective"],
  ["笑","xiào","verb","to smile, laugh","她笑了。","......","......","Subject + Verb + 了"],
  ["些","xiē","measure word","some","这些书","......","......","这 + 些 + Noun"],
  ["写","xiě","verb","to write","我写汉字。","......","......","写 + Object"],
  ["心","xīn","noun","heart, mind","开心最重要。","......","......","Adjective + 心"],
  ["新","xīn","adjective","new","我买了新手机。","......","......","Adjective + Noun"],
  ["信","xìn","noun/verb","letter, to believe","我相信你。","......","......","相信 + Object"],
  ["行","xíng","adjective/verb","okay, to walk","行，没问题。","......","......","Response"],
  ["姓","xìng","verb/noun","to be surnamed","我姓王。","......","......","Subject + 姓 + Surname"],
  ["星","xīng","noun","star","天上有很多星星。","......","......","Place + 有 + Noun"],
  ["星期","xīngqī","noun","week","今天是星期一。","......","......","是 + Day of Week"],
  ["醒","xǐng","verb","to wake up","我每天七点醒来。","......","......","Time + Verb"],
  ["性","xìng","noun","gender, nature","性别很重要。","......","......","Noun + 很 + Adjective"],
  ["兄","xiōng","noun","elder brother","兄弟情深。","......","......","Noun + Compound"],
  ["休","xiū","verb","to rest","休息一下。","......","......","Verb + 一下"],
  ["休息","xiūxi","verb/noun","to rest","我们休息十分钟。","......","......","Subject + Verb + Time"],
  ["学","xué","verb","to learn","我学中文。","......","......","学 + Subject"],
  ["学生","xuésheng","noun","student","我是学生。","......","......","Subject + 是 + Noun"],
  ["学校","xuéxiào","noun","school","学校很大。","......","......","Noun + 很 + Adjective"],
  ["雪","xuě","noun","snow","下雪了。","......","......","Verb + 了"],
  ["血","xuè","noun","blood","他流血了。","......","......","Verb + 血 + 了"],
  ["压","yā","verb","to press","压力很大。","......","......","Noun + 很 + Adjective"],
  ["牙","yá","noun","tooth","我刷牙。","......","......","Verb + 牙"],
  ["烟","yān","noun","smoke, cigarette","不要吸烟。","......","......","不要 + Verb + Noun"],
  ["言","yán","noun","speech, word","语言很重要。","......","......","Noun + 很 + Adjective"],
  ["羊","yáng","noun","sheep, goat","一只羊","......","......","Number + 只 + Animal"],
  ["样","yàng","noun","kind, type","一样的东西。","......","......","一 + 样 + 的 + Noun"],
  ["药","yào","noun","medicine","吃药了吗？","......","......","Verb + Object + 了吗"],
  ["也","yě","adverb","also, too","我也是学生。","......","......","Subject + 也 + Verb"],
  ["页","yè","measure word","page","打开书第十页。","......","......","Verb + Object + Number + 页"],
  ["一","yī","numeral","one","一个苹果","......","......","Number + 个 + Noun"],
  ["医","yī","noun","medicine","他是医生。","......","......","Subject + 是 + Occupation"],
  ["医生","yīshēng","noun","doctor","看医生","......","......","Verb + Occupation"],
  ["衣","yī","noun","clothes","穿衣服","......","......","Verb + Noun"],
  ["已经","yǐjīng","adverb","already","我已经吃了。","......","......","已经 + Verb + 了"],
  ["以","yǐ","preposition","with, by","以后见。","......","......","以 + 后"],
  ["以后","yǐhòu","noun","later, after","以后再说。","......","......","Time + Verb"],
  ["易","yì","adjective","easy","很容易","......","......","很 + Adjective"],
  ["音","yīn","noun","sound","声音很大。","......","......","Noun + 很 + Adjective"],
  ["音乐","yīnyuè","noun","music","听音乐","......","......","Verb + Noun"],
  ["银","yín","noun","silver","银色","......","......","Noun + 色"],
  ["印","yìn","verb/noun","to print, seal","打印文件","......","......","Verb + Object"],
  ["应","yìng","verb","should, answer","应该学习","......","......","应该 + Verb"],
  ["应该","yīnggāi","verb","should","你应该来。","......","......","Subject + 应该 + Verb"],
  ["硬","yìng","adjective","hard","很硬","......","......","很 + Adjective"],
  ["用","yòng","verb","to use","用电脑","......","......","用 + Tool"],
  ["由","yóu","preposition","from, by","由你决定。","......","......","由 + Person + Verb"],
  ["有","yǒu","verb","to have, there is","我有书。","......","......","Subject + 有 + Object"],
  ["又","yòu","adverb","again","又来了","......","......","又 + Verb + 了"],
  ["右","yòu","noun","right","右边","......","......","右 + 边"],
  ["鱼","yú","noun","fish","吃鱼","......","......","Verb + Noun"],
  ["语","yǔ","noun","language","说汉语","......","......","Verb + Language"],
  ["元","yuán","measure word","yuan (money)","十元","......","......","Number + 元"],
  ["园","yuán","noun","garden","去公园","......","......","去 + Noun"],
  ["远","yuǎn","adjective","far","很远","......","......","很 + Adjective"],
  ["院","yuàn","noun","yard, hospital","在医院","......","......","在 + Noun"],
  ["月","yuè","noun","moon, month","一月","......","......","Number + 月"],
  ["月亮","yuèliang","noun","moon","月亮很圆。","......","......","Subject + 很 + Adjective"],
  ["再","zài","adverb","again","再见","......","......","Verb + 再 + Verb"],
  ["在","zài","verb/prep","at, in","在家","......","......","在 + Place"],
  ["早","zǎo","adjective","early","早上好","......","......","Time + 好"],
  ["早上","zǎoshang","noun","morning","早上八点","......","......","Time + Number + 点"],
  ["怎","zěn","pronoun","how","怎么办？","......","......","怎么 + Verb"],
  ["怎么","zěnme","pronoun","how","怎么去？","......","......","怎么 + Verb"],
  ["站","zhàn","verb/noun","to stand, station","车站","......","......","Verb + 站"],
  ["张","zhāng","measure word","for flat objects","一张纸","......","......","Number + 张 + Noun"],
  ["长","zhǎng","verb","to grow","长大","......","......","Verb + 大"],
  ["找","zhǎo","verb","to look for","找东西","......","......","找 + Object"],
  ["照","zhào","verb","to shine, take photo","照相","......","......","Verb + Object"],
  ["这","zhè","pronoun","this","这个","......","......","这 + Measure Word"],
  ["这儿","zhèr","pronoun","here","在这儿","......","......","在 + 这儿"],
  ["真","zhēn","adverb","really","真好","......","......","真 + Adjective"],
  ["正","zhèng","adverb","just, right","正在","......","......","正 + 在 + Verb"],
  ["正在","zhèngzài","adverb","in progress","正在学习","......","......","正在 + Verb"],
  ["知","zhī","verb","to know","知道","......","......","知 + 道"],
  ["知道","zhīdào","verb","to know","我知道","......","......","Subject + 知道"],
  ["只","zhǐ","adverb","only","只有","......","......","只 + Verb"],
  ["中","zhōng","noun","middle, China","中国","......","......","中 + 国"],
  ["中国","Zhōngguó","noun","China","我爱中国。","......","......","Subject + 爱 + Country"],
  ["钟","zhōng","noun","clock","时钟","......","......","Noun"],
  ["种","zhǒng","measure word","kind, type","一种","......","......","Number + 种 + Noun"],
  ["重","zhòng","adjective","heavy","很重","......","......","很 + Adjective"],
  ["周","zhōu","noun","week","一周","......","......","Number + 周"],
  ["主","zhǔ","adjective","main, primary","主要","......","......","Adjective"],
  ["住","zhù","verb","to live","住家里","......","......","住 + Place"],
  ["助","zhù","verb","to help","帮助","......","......","帮 + 助"],
  ["祝","zhù","verb","to wish","祝你快乐","......","......","祝 + Person + Adjective"],
  ["专","zhuān","adjective","special","专门","......","......","Adjective"],
  ["准","zhǔn","adjective","accurate","准备","......","......","Verb"],
  ["桌子","zhuōzi","noun","table, desk","桌子上","......","......","Place + 上"],
  ["字","zì","noun","character, word","写汉字","......","......","Verb + Object"],
  ["自己","zìjǐ","pronoun","oneself","我自己","......","......","Subject + 自己"],
  ["总","zǒng","adverb","always, total","总是","......","......","总 + 是 + Verb"],
  ["走","zǒu","verb","to walk, go","走路","......","......","Verb + Object"],
  ["足","zú","noun","foot","足球","......","......","Noun"],
  ["嘴","zuǐ","noun","mouth","嘴巴","......","......","Noun"],
  ["最","zuì","adverb","most","最好","......","......","最 + Adjective"],
  ["左","zuǒ","noun","left","左边","......","......","左 + 边"],
  ["坐","zuò","verb","to sit","坐下","......","......","Verb + 下"],
  ["做","zuò","verb","to do, make","做作业","......","......","做 + Object"],
  ["作业","zuòyè","noun","homework","写作业","......","......","Verb + Object"]],
"4":[["啊","ā","叹"],["爱情","àiqíng","名"],["安慰","ānwèi","动"],["安心","ān xīn",""],["暗","àn","形"],["按照","ànzhào","介"],["把握","bǎwò","动、名"],["白","bái","形"],["百分之","bǎifēnzhī",""],["般","bān","形"],["宝贝","bǎobèi","名、形"],["保证","bǎozhèng","动、名"],["报道","bàodào","动、名"],["报名","bào míng",""],["背","bèi","动"],["本来","běnlái","副、形"],["笔记本","bǐjìběn","名"],["毕竟","bìjìng","副"],["便","biàn","副"],["标准","biāozhǔn","名、形"],["表达","biǎodá","动"],["表格","biǎogé","名"],["表演","biǎoyǎn","动、名"],["表现","biǎoxiàn","动、名"],["博士","bóshì","名"],["补充","bǔchōng","动"],["不安","bù'ān","形"],["不得不","bùdébù","副"],["不管","bùguǎn","连"],["不论","bùlùn","连"],["不满","bùmǎn","形"],["材料","cáiliào","名"],["彩虹","cǎihóng","名"],["参加","cānjiā","动"],["参考","cānkǎo","动"],["操","cāo","动"],["策略","cèlüè","名"],["长途","chángtú","形"],["朝","cháo","介"],["吵架","chǎo jià",""],["车辆","chēliàng","名"],["成功","chénggōng","动、形"],["成绩","chéngjì","名"],["成立","chénglì","动"],["诚实","chéngshí","形"],["冲","chōng","动"],["重复","chóngfù","动"],["出现","chūxiàn","动"],["出差","chū chāi",""],["传递","chuándì","动"],["存在","cúnzài","动"],["打招呼","dǎ zhāohu",""],["大约","dàyuē","副"],["代表","dàibiǎo","动、名"],["当地","dāngdì","名"],["倒","dào","动"],["道德","dàodé","名"],["登记","dēngjì","动"],["等等","děngděng","助"],["底","dǐ","名"],["地球","dìqiú","名"],["地址","dìzhǐ","名"],["点击","diǎnjī","动"],["电子","diànzǐ","名"],["丢","diū","动"],["堆","duī","量、名"],["对待","duìdài","动"],["对方","duìfāng","名"],["对于","duìyú","介"],["顿","dùn","量"],["发展","fāzhǎn","动、名"],["法律","fǎlǜ","名"],["反对","fǎnduì","动"],["反应","fǎnyìng","动、名"],["返回","fǎnhuí","动"],["方式","fāngshì","名"],["方向盘","fāngxiàngpán","名"],["放弃","fàngqì","动"],["负责","fùzé","动、形"],["付","fù","动"],["复杂","fùzá","形"],["父母","fùmǔ","名"],["改变","gǎibiàn","动"],["感动","gǎndòng","形"],["刚","gāng","副"],["高楼","gāolóu","名"],["告别","gàobié","动"],["各自","gèzì","代"],["功能","gōngnéng","名"],["恭喜","gōngxǐ","动"],["估计","gūjì","动、名"],["故障","gùzhàng","名"],["观点","guāndiǎn","名"],["关于","guānyú","介"],["光","guāng","名、形"],["广","guǎng","形"],["广场","guǎngchǎng","名"],["过期","guò qī",""],["海","hǎi","名"],["害羞","hàixiū","形"],["喊","hǎn","动"],["好处","hǎochù","名"],["好奇","hàoqí","形"],["呼吸","hūxī","动"],["后来","hòulái","名"],["后退","hòutuì","动"],["花费","huāfèi","动、名"],["话题","huàtí","名"],["幻想","huànxiǎng","动、名"],["回忆","huíyì","动、名"],["火","huǒ","名"],["积极","jījí","形"],["积累","jīlěi","动"],["基本","jīběn","形、副"],["吉祥","jíxiáng","形"],["技术","jìshù","名"],["既然","jìrán","连"],["减","jiǎn","动"],["接触","jiēchù","动"],["接受","jiēshòu","动"],["结果","jiéguǒ","名、连"],["尽管","jǐnguǎn","连、副"],["进步","jìnbù","动、名"],["进行","jìnxíng","动"],["近","jìn","形"],["经历","jīnglì","动、名"],["竟然","jìngrán","副"],["警察","jǐngchá","名"],["敬","jìng","动"],["究竟","jiūjìng","副"],["就算","jiùsuàn","连"],["举例","jǔ lì",""],["具体","jùtǐ","形"],["开发","kāifā","动"],["开始","kāishǐ","动、名"],["克服","kèfú","动"],["空","kōng","形"],["恐怕","kǒngpà","副"],["困难","kùnnan","名、形"],["浪费","làngfèi","动"],["浪漫","làngmàn","形"],["力量","lìliang","名"],["理解","lǐjiě","动、名"],["理想","lǐxiǎng","名、形"],["厉害","lìhai","形"],["联系","liánxì","动、名"],["领导","lǐngdǎo","动、名"],["流行","liúxíng","动、形"],["留","liú","动"],["逻辑","luójí","名"],["落后","luòhòu","动、形"],["民族","mínzú","名"],["面对","miànduì","动"],["命运","mìngyùn","名"],["目前","mùqián","名"],["哦","ó","叹"],["偶尔","ǒu'ěr","副"],["批评","pīpíng","动、名"],["拼音","pīnyīn","名"],["普遍","pǔbiàn","形"],["期间","qījiān","名"],["期望","qīwàng","动、名"],["强","qiáng","形"],["千","qiān","数"],["签","qiān","动"],["勤奋","qínfèn","形"],["请求","qǐngqiú","动、名"],["情绪","qíngxù","名"],["全面","quánmiàn","形"],["确","què","副"],["确定","quèdìng","动、形"],["认可","rènkě","动"],["任何","rènhé","代"],["任务","rènwu","名"],["任意","rènyì","形"],["日常","rìcháng","形"],["如何","rúhé","代"],["入","rù","动"],["生活","shēnghuó","动、名"],["胜利","shènglì","动、名"],["实现","shíxiàn","动"],["收入","shōurù","名"],["社会","shèhuì","名"],["失败","shībài","动、名"],["时代","shídài","名"],["随便","suíbiàn","形、副"],["随着","suízhe","介"],["损失","sǔnshī","动、名"],["讨论","tǎolùn","动、名"],["提高","tígāo","动"],["提醒","tíxǐng","动"],["条件","tiáojiàn","名"],["听说","tīngshuō","动"],["同意","tóngyì","动"],["突然","tūrán","形、副"],["推广","tuīguǎng","动"],["网络","wǎngluò","名"],["危险","wēixiǎn","形、名"],["为了","wèile","介"],["温度","wēndù","名"],["文件","wénjiàn","名"],["问候","wènhòu","动"],["无论","wúlùn","连"],["相当","xiāngdāng","形、副"],["响","xiǎng","动"],["效果","xiàoguǒ","名"],["信息","xìnxī","名"],["形式","xíngshì","名"],["虚心","xūxīn","形"],["学科","xuékē","名"],["要么","yàome","连"],["也就是说","yě jiùshì shuō",""],["一方面","yī fāngmiàn",""],["遗憾","yíhàn","形、名"],["以及","yǐjí","连"],["意识","yìshí","名、动"],["意义","yìyì","名"],["因此","yīncǐ","连"],["应聘","yìngpìn","动"],["拥抱","yōngbào","动"],["拥有","yōngyǒu","动"],["优秀","yōuxiù","形"],["由于","yóuyú","连、介"],["友好","yǒuhǎo","形"],["有趣","yǒuqù","形"],["愉快","yúkuài","形"],["欲望","yùwàng","名"],["原因","yuányīn","名"],["约","yuē","动、副"],["赞美","zànměi","动"],["增长","zēngzhǎng","动"],["珍惜","zhēnxī","动"],["整理","zhěnglǐ","动"],["正常","zhèngcháng","形"],["支持","zhīchí","动、名"],["最终","zuìzhōng","副"],["遵守","zūnshǒu","动"]],"5":[["唉","ài","叹"],["哎","āi","叹"],["爱护","àihù","动"],["爱惜","àixī","动"],["爱心","àixīn","名"],["安排","ānpái","动、名"],["安全","ānquán","形、名"],["暗示","ànshì","动、名"],["熬夜","áo yè",""],["把握","bǎwò","动、名"],["白白","báibái","副"],["摆","bǎi","动"],["版本","bǎnběn","名"],["帮忙","bāng máng",""],["包含","bāohán","动"],["报告","bàogào","动、名"],["保持","bǎochí","动"],["倍","bèi","量"],["背景","bèijǐng","名"],["辩论","biànlùn","动、名"],["标志","biāozhì","名、动"],["表格","biǎogé","名"],["博客","bókè","名"],["部门","bùmén","名"],["财产","cáichǎn","名"],["财富","cáifù","名"],["才能","cáinéng","名"],["操作","cāozuò","动"],["策略","cèlüè","名"],["曾经","céngjīng","副"],["成分","chéngfèn","名"],["成就","chéngjiù","名"],["成熟","chéngshú","形、动"],["持续","chíxù","动"],["传播","chuánbō","动"],["创新","chuàngxīn","动、名"],["创造","chuàngzào","动"],["词汇","cíhuì","名"],["从事","cóngshì","动"],["大量","dàliàng","形"],["大型","dàxíng","形"],["大多数","dàduōshù","名"],["答案","dá'àn","名"],["单位","dānwèi","名"],["当心","dāng xīn",""],["道理","dàolǐ","名"],["得罪","dézuì","动"],["等待","děngdài","动"],["敌人","dírén","名"],["地位","dìwèi","名"],["调节","tiáojié","动"],["定期","dìngqī","形、副"],["动作","dòngzuò","名"],["多余","duōyú","形"],["而","ér","连"],["发挥","fāhuī","动"],["发明","fāmíng","动、名"],["发布","fābù","动"],["繁忙","fánmáng","形"],["方式","fāngshì","名"],["方向","fāngxiàng","名"],["分配","fēnpèi","动"],["分析","fēnxī","动、名"],["符合","fúhé","动"],["幅","fú","量"],["改革","gǎigé","动、名"],["概念","gàiniàn","名"],["感受","gǎnshòu","动、名"],["高度","gāodù","名、形"],["个人","gèrén","名"],["个性","gèxìng","名"],["根本","gēnběn","名、形、副"],["工程","gōngchéng","名"],["公平","gōngpíng","形"],["贡献","gòngxiàn","动、名"],["沟通","gōutōng","动"],["估计","gūjì","动、名"],["规律","guīlǜ","名"],["规模","guīmó","名"],["规则","guīzé","名"],["好奇","hàoqí","形"],["合理","hélǐ","形"],["核心","héxīn","名"],["何况","hékuàng","连"],["环保","huánbǎo","名、形"],["回复","huífù","动"],["机制","jīzhì","名"],["激励","jīlì","动"],["即将","jíjiāng","副"],["既然","jìrán","连"],["记忆","jìyì","名、动"],["技能","jìnéng","名"],["坚定","jiāndìng","形、动"],["简洁","jiǎnjié","形"],["建立","jiànlì","动"],["建设","jiànshè","动"],["建议","jiànyì","动、名"],["讲究","jiǎngjiu","动、形"],["交流","jiāoliú","动、名"],["交往","jiāowǎng","动"],["结构","jiégòu","名"],["解决","jiějué","动"],["解释","jiěshì","动、名"],["机会","jīhuì","名"],["进一步","jìnyībù","副"],["积极性","jījíxìng","名"],["具备","jùbèi","动"],["聚集","jùjí","动"],["具体","jùtǐ","形"],["竞争","jìngzhēng","动、名"],["来自","láizì","动"],["理由","lǐyóu","名"],["立即","lìjí","副"],["留下","liúxia","动"],["领域","lǐngyù","名"],["论文","lùnwén","名"],["面临","miànlín","动"],["明显","míngxiǎn","形"],["模式","móshì","名"],["能力","nénglì","名"],["内容","nèiróng","名"],["目标","mùbiāo","名"],["排除","páichú","动"],["判断","pànduàn","动、名"],["培养","péiyǎng","动"],["平衡","pínghéng","动、形"],["评价","píngjià","动、名"],["普及","pǔjí","动"],["前景","qiánjǐng","名"],["强调","qiángdiào","动"],["确保","quèbǎo","动"],["认识","rènshi","动、名"],["人才","réncái","名"],["社区","shèqū","名"],["深入","shēnrù","形、动"],["审美","shěnměi","动"],["生态","shēngtài","名"],["实际上","shíjìshàng","副"],["时机","shíjī","名"],["事实","shìshí","名"],["数据","shùjù","名"],["素质","sùzhì","名"],["体现","tǐxiàn","动"],["提出","tíchū","动"],["途径","tújìng","名"],["推进","tuījìn","动"],["完善","wánshàn","动、形"],["维护","wéihù","动"],["文明","wénmíng","名、形"],["问卷","wènjuàn","名"],["现象","xiànxiàng","名"],["相互","xiānghù","副"],["心理","xīnlǐ","名"],["形成","xíngchéng","动"],["需求","xūqiú","名"],["研究","yánjiū","动、名"],["严肃","yánsù","形"],["印象深刻","yìnxiàng shēnkè",""],["应对","yìngduì","动"],["影响","yǐngxiǎng","动、名"],["因素","yīnsù","名"],["有效","yǒuxiào","形"],["意外","yìwài","形、名"],["运用","yùnyòng","动"],["整体","zhěngtǐ","名、形"],["制度","zhìdù","名"],["种类","zhǒnglèi","名"],["重视","zhòngshì","动"],["综合","zōnghé","形、动"],["作用","zuòyòng","名"],["最终","zuìzhōng","副"]],"6":[["岸","àn","名"],["昂贵","ángguì","形"],["把握","bǎwò","动、名"],["保障","bǎozhàng","动、名"],["爆发","bàofā","动"],["背后","bèihòu","名"],["崩溃","bēngkuì","动"],["比例","bǐlì","名"],["边界","biānjìe","名"],["辩证","biànzhèng","形"],["冰山","bīngshān","名"],["勃然大怒","bórán-dànù",""],["不得已","bùdéyǐ","形、副"],["不可思议","bùkěsīyì","形"],["不时","bùshí","副"],["不由自主","bùyóuzìzhǔ",""],["朴素","pǔsù","形"],["承受","chéngshòu","动"],["充分","chōngfèn","形、副"],["充满","chōngmǎn","动"],["出口","chūkǒu","名、动"],["除此之外","chúcǐ zhīwài",""],["处于","chǔyú","动"],["传统","chuántǒng","名、形"],["创立","chuànglì","动"],["大量","dàliàng","形"],["代价","dàijià","名"],["担忧","dānyōu","动"],["当局","dāngjú","名"],["导致","dǎozhì","动"],["的确","díquè","副"],["地位","dìwèi","名"],["典型","diǎnxíng","形、名"],["定义","dìngyì","动、名"],["独立","dúlì","动、形"],["独特","dútè","形"],["对比","duìbǐ","动、名"],["而言","éryán",""],["发挥","fāhuī","动"],["反映","fǎnyìng","动"],["丰富","fēngfù","形、动"],["否定","fǒudìng","动、形"],["辐射","fúshè","动、名"],["赋予","fùyǔ","动"],["改善","gǎishàn","动"],["感激","gǎnjī","动"],["干预","gānyù","动"],["高效","gāoxiào","形"],["各种","gèzhǒng","代"],["共同","gòngtóng","形、副"],["观察","guānchá","动"],["惯例","guànlì","名"],["广泛","guǎngfàn","形"],["规范","guīfàn","动、名、形"],["归纳","guīnà","动"],["归因","guīyīn","动"],["含义","hányì","名"],["合作","hézuò","动"],["宏观","hóngguān","形"],["机构","jīgòu","名"],["基础","jīchǔ","名"],["基于","jīyú","介"],["几乎","jīhū","副"],["价值","jiàzhí","名"],["坚决","jiānjué","形"],["监督","jiāndū","动"],["建构","jiàngòu","动"],["交叉","jiāochā","动、形"],["教训","jiàoxun","名"],["局限","júxiàn","动、名"],["竞争","jìngzhēng","动、名"],["积累","jīlěi","动"],["可靠","kěkào","形"],["扩大","kuòdà","动"],["理论","lǐlùn","名"],["立场","lìchǎng","名"],["利益","lìyì","名"],["联合","liánhé","动、形"],["量化","liànghuà","动"],["逻辑","luójí","名"],["模糊","móhu","形"],["目的","mùdì","名"],["内在","nèizài","形"],["平等","píngděng","形"],["评估","pínggū","动、名"],["起源","qǐyuán","动、名"],["取得","qǔdé","动"],["确立","quèlì","动"],["人口","rénkǒu","名"],["认同","rèntóng","动"],["融合","rónghé","动"],["弱点","ruòdiǎn","名"],["三角","sānjiǎo","名"],["时期","shíqī","名"],["实施","shíshī","动"],["市场","shìchǎng","名"],["手段","shǒuduàn","名"],["输出","shūchū","动、名"],["属于","shǔyú","动"],["率","lǜ","名、量"],["双方","shuāngfāng","名"],["思路","sīlù","名"],["思维","sīwéi","名"],["探讨","tàntǎo","动"],["特征","tèzhēng","名"],["提供","tígōng","动"],["统一","tǒngyī","动、形"],["图书","túshū","名"],["维度","wéidù","名"],["文字","wénzì","名"],["稳定","wěndìng","形、动"],["系统","xìtǒng","名"],["现实","xiànshí","名、形"],["相关","xiāngguān","形"],["效益","xiàoyì","名"],["新型","xīnxíng","形"],["形象","xíngxiàng","名、形"],["压力","yālì","名"],["延伸","yánshēn","动"],["演变","yǎnbiàn","动"],["依据","yījù","名、介"],["引导","yǐndǎo","动"],["预测","yùcè","动、名"],["约束","yuēshù","动、名"],["运作","yùnzuò","动"],["在于","zàiyú","动"],["政治","zhèngzhì","名"],["整合","zhěnghé","动"],["制约","zhìyuē","动"],["周期","zhōuqī","名"],["主导","zhǔdǎo","动、名"],["主体","zhǔtǐ","名"],["资源","zīyuán","名"],["自觉","zìjué","形、副"],["作为","zuòwéi","动、介"]],"7":[["挨","ái","动"],["癌","ái","名"],["挨","āi","动、介"],["爱不释手","àibúshìshǒu",""],["爱戴","àidài","动"],["挨家挨户","āijiā-āihù",""],["暧昧","àimèi","形"],["爱慕","àimù","动"],["哀求","āiqiú","动"],["碍事","àishì","动、形"],["爱惜","àixī","动"],["癌症","áizhèng","名"],["艾滋病","àizībìng","名"],["暗地里","àndìlǐ","名"],["安定","āndìng","形、动"],["安抚","ānfǔ","动"],["案件","ànjiàn","名"],["按理","ànlǐ","副"],["安眠药","ānmiányào","名"],["安宁","ānníng","形"],["按钮","ànniǔ","名"],["按说","ànshuō","副"],["安稳","ānwěn","形"],["安详","ānxiáng","形"],["安心","ānxīn","形"],["安逸","ānyì","形"],["安置","ānzhì","动"],["暗中","ànzhōng","名"],["熬","áo","动"],["傲","ào","形"],["凹","āo","形"],["傲慢","àomàn","形"],["奥秘","àomì","名"],["拔","bá","动"],["坝","bà","名"],["扒","bā","动"],["疤","bā","名"],["把柄","bǎbǐng","名"],["巴不得","bābudé","动"],["八成","bāchéng","数量、副"],["霸道","bàdào","形"],["罢工","bàgōng","动"],["八卦","bāguà","名、形"],["把关","bǎguān","动"],["掰","bāi","动"],["百般","bǎibān","副、数量"],["摆动","bǎidòng","动"],["百分比","bǎifēnbǐ","名"],["百合","bǎihé","名"],["败坏","bàihuài","动、形"],["拜会","bàihuì","动"],["拜见","bàijiàn","动"],["百科全书","bǎikē quánshū",""],["摆平","bǎipíng","动"],["摆设","bǎishe","名"],["柏树","bǎishù","名"],["拜托","bàituō","动"],["巴结","bājie","动"],["罢了","bàle","助"],["芭蕾","bālěi","名"],["罢免","bàmiǎn","动"],["扮","bàn","动"],["伴","bàn","名、动"],["拌","bàn","动"],["绊","bàn","动"],["扳","bān","动"],["半边天","bànbiāntiān","名"],["颁布","bānbù","动"],["半岛","bàndǎo","名"],["半导体","bàndǎotǐ","名"],["斑点","bāndiǎn","名"],["颁发","bānfā","动"],["磅","bàng","量、名"],["绑","bǎng","动"],["绑架","bǎngjià","动"],["帮手","bāngshou","名"],["颁奖","bānjiǎng","动"],["绊脚石","bànjiǎoshí","名"],["半径","bànjìng","名"],["板块","bǎnkuài","名"],["伴侣","bànlǚ","名"],["斑马线","bānmǎxiàn","名"],["搬迁","bānqiān","动"],["版权","bǎnquán","名"],["办事处","bànshìchù","名"],["半数","bànshù","名"],["半途而废","bàntú'érfèi",""],["半信半疑","bànxìn-bànyí",""],["办学","bànxué","动"],["伴奏","bànzòu","动"],["报","bào","动"],["豹","bào","名"],["煲","bāo","名、动"],["剥","bāo","动"],["报案","bào'àn","动"],["包庇","bāobì","动"],["褒贬","bāobiǎn","动"],["报酬","bàochou","名"],["报仇","bàochóu","动"],["报答","bàodá","动"],["报废","bàofèi","动"],["暴风骤雨","bàofēng-zhòuyǔ",""],["报复","bàofù","动"],["抱负","bàofù","名"],["包袱","bāofu","名"],["曝光","bàoguāng","动"],["饱和","bǎohé","动"],["饱经沧桑","bǎojīng-cāngsāng",""],["宝库","bǎokù","名"],["堡垒","bǎolěi","名"],["暴利","bàolì","名"],["包罗万象","bāoluó-wànxiàng",""],["爆满","bàomǎn","动"],["饱满","bǎomǎn","形"],["保密","bǎomì","动"],["保姆","bǎomǔ","名"],["包容","bāoróng","动"],["宝石","bǎoshí","名"],["保守","bǎoshǒu","动、形"],["保卫","bǎowèi","动"],["包围","bāowéi","动"],["保鲜","bǎoxiān","动"],["报销","bàoxiāo","动"],["保养","bǎoyǎng","动"],["保佑","bǎoyòu","动"],["包扎","bāozā","动"],["宝藏","bǎozàng","名"],["暴躁","bàozào","形"],["保重","bǎozhòng","动"],["爆竹","bàozhú","名"],["把手","bǎshou","名"],["罢休","bàxiū","动"],["霸占","bàzhàn","动"],["巴掌","bāzhang","名"],["靶子","bǎzi","名"],["备","bèi","动、副"],["碑","bēi","名"],["悲哀","bēi'āi","形"],["卑鄙","bēibǐ","形"],["悲惨","bēicǎn","形"],["备份","bèifèn","名、动"],["背负","bēifù","动"],["被告","bèigào","名"],["悲欢离合","bēihuān-líhé",""],["背叛","bèipàn","动"],["倍增","bèizēng","动"],["贝壳","bèiké","名"],["背景","bèijǐng","名"],["奔波","bēnbō","动"],["奔跑","bēnpǎo","动"],["崩溃","bēngkuì","动"],["蹦","bèng","动"],["逼","bī","动"],["比较而言","bǐjiào éryán",""],["弊端","bìduān","名"],["毕生","bìshēng","名"],["弊病","bìbìng","名"],["鼻涕","bítì","名"],["比喻","bǐyù","动、名"],["毕竟","bìjìng","副"],["辩护","biànhù","动"],["变迁","biànqiān","动、名"],["变形","biàn xíng",""],["冰雹","bīngbáo","名"],["冰川","bīngchuān","名"],["秉公","bǐnggōng","副"],["病毒","bìngdú","名"],["并排","bìngpái","副"],["病患","bìnghuàn","名"],["博大精深","bódà-jīngshēn",""],["薄弱","bóruò","形"],["脖子","bózi","名"],["补偿","bǔcháng","动、名"],["布局","bùjú","动、名"],["步骤","bùzhòu","名"],["不知不觉","bùzhī-bùjué",""],["不折不扣","bùzhé-bùkòu","副"],["才干","cáigàn","名"],["财政","cáizhèng","名"],["参谋","cānmóu","动、名"],["残酷","cánkù","形"],["操控","cāokòng","动"],["侧重","cèzhòng","动"],["差距","chājù","名"],["差异","chāyì","名"],["阐述","chǎnshù","动"],["彻底","chèdǐ","形、副"],["沉默","chénmò","形、动"],["迟疑","chíyí","动"],["持之以恒","chízhī-yǐhéng",""],["冲突","chōngtū","动、名"],["抽象","chōuxiàng","形"],["出路","chūlù","名"],["出谋划策","chūmóu-huàcè",""],["出血","chū xiě",""],["处理","chǔlǐ","动"],["储存","chǔcún","动、名"],["储量","chǔliàng","名"],["传承","chuánchéng","动、名"],["创作","chuàngzuò","动、名"],["垂直","chuízhí","形"],["磁场","cíchǎng","名"],["从容","cóngróng","形"],["从属","cóngshǔ","动"],["粗糙","cūcāo","形"],["促成","cùchéng","动"],["摧毁","cuīhuǐ","动"],["措施","cuòshī","名"],["搭档","dādàng","名、动"],["打压","dǎyā","动"],["大幅度","dà fúdù",""],["大批","dàpī","形、名"],["大赦","dàshè","动"],["代沟","dàigōu","名"],["带领","dàilǐng","动"],["单纯","dānchún","形"],["单调","dāndiao","形"],["分担","fēndān","动"],["淡化","dànhuà","动"],["当初","dāngchū","名"],["当代","dāngdài","名"],["凝固","nínggù","动"],["倒退","dàotuì","动"],["道义","dàoyì","名"],["低调","dīdiào","形"],["低迷","dīmí","形"],["抵制","dǐzhì","动"],["点缀","diǎnzhuì","动"],["掉队","diào duì",""],["定期","dìngqī","形、副"],["动荡","dòngdàng","形"],["读书","dú shū",""],["端正","duānzhèng","形"],["对抗","duìkàng","动"],["对立","duìlì","动、形"],["对外","duìwài","形"],["多元","duōyuán","形"],["恶化","èhuà","动"],["恶势力","è shìlì",""],["发达","fādá","形"],["发动","fādòng","动"],["发誓","fā shì",""],["烦恼","fánnǎo","形、名"],["繁荣","fánróng","形、动"],["防范","fángfàn","动"],["防御","fángyù","动"],["废除","fèichú","动"],["分辨","fēnbiàn","动"],["分化","fēnhuà","动"],["丰盛","fēngshèng","形"],["否认","fǒurèn","动"],["腐败","fǔbài","形、动"],["弘扬","hóngyáng","动"],["辅助","fǔzhù","动、形"],["复苏","fùsū","动"],["复习","fùxí","动"],["赶超","gǎnchāo","动"],["刚性","gāngxìng","形"],["高效率","gāo xiàolǜ",""],["巩固","gǒnggù","动、形"],["共存","gòngcún","动"],["挂","guà","动"],["关键","guānjiàn","名、形"],["管控","guǎnkòng","动"],["贯彻","guànchè","动"],["光荣","guāngróng","形"],["归属","guīshǔ","动"],["过渡","guòdù","动"],["核实","héshí","动"],["划分","huāfēn","动"],["活力","huólì","名"],["基调","jīdiào","名"],["激活","jīhuó","动"],["即可","jí kě",""],["记载","jìzǎi","动、名"],["技巧","jìqiǎo","名"],["迹象","jìxiàng","名"],["精彩","jīngcǎi","形"],["精华","jīnghuá","名"],["精确","jīngquè","形"],["精神","jīngshén","名、形"],["警示","jǐngshì","动、名"],["拒绝","jùjué","动"],["开拓","kāituò","动"],["开放","kāifàng","动、形"],["客观","kèguan","形"],["控制","kòngzhì","动"],["夸大","kuādà","动"],["扩张","kuòzhāng","动"],["来源","láiyuán","名、动"],["冷静","lěngjìng","形"],["历程","lìchéng","名"],["力求","lìqiú","动"],["连续","liánxù","形"],["劣势","lièshì","名"],["落实","luòshí","动"],["矛盾","máodùn","名、形"],["矛盾体","máodùntǐ","名"],["每当","měidāng","连"],["门槛","ménkǎn","名"],["名誉","míngyù","名"],["模仿","mófǎng","动"],["谋取","móuqǔ","动"],["内部","nèibù","名"],["凝聚","níngjù","动"],["排斥","páichì","动"],["陪伴","péibàn","动"],["彭胀","péngzhàng","动"],["偏见","piānjian","名"],["偏向","piānxiàng","动"],["拼搏","pīnbó","动"],["迫使","pòshǐ","动"],["破坏","pòhuài","动"],["期限","qīxiàn","名"],["迁移","qiānyí","动"],["清晰","qīngxī","形"],["驱动","qūdòng","动"],["取消","qǔxiāo","动"],["全局","quánjú","名"],["确实","quèshí","副、形"],["缺乏","quēfá","动"],["缺陷","quēxiàn","名"],["热忱","rèchén","名"],["认知","rènzhī","动、名"],["任职","rèn zhí",""],["融资","róngzī","动"],["散布","sànbù","动"],["深化","shēnhuà","动"],["渗透","shèntòu","动"],["胜任","shèngrèn","动"],["失去","shīqù","动"],["时间表","shíjiānbiǎo","名"],["实质","shízhì","名"],["势力","shìlì","名"],["适应","shìyìng","动"],["收益","shōuyì","名"],["受限","shòu xiàn",""],["束缚","shùfù","动、名"],["顺应","shùnyìng","动"],["倡议","chàngyì","动、名"],["随意","suíyì","形、副"],["损害","sǔnhài","动"],["探索","tànsuo","动"],["态势","tàishì","名"],["体制","tǐzhì","名"],["添加","tiānjiā","动"],["调整","tiáozhěng","动、名"],["统筹","tǒngchóu","动"],["突破","tūpò","动、名"],["退出","tuìchū","动"],["外部","wàibù","名"],["完整","wánzhěng","形"],["威胁","wēixié","动、名"],["委托","wěituō","动"],["维权","wéi quán",""],["相互促进","xiānghù cùjìn",""],["消除","xiāochú","动"],["效率","xiàolǜ","名"],["有所不同","yǒusuǒbùtóng",""],["优化","yōuhuà","动"],["优势","yōushì","名"],["遭遇","zāoyù","动、名"],["增强","zēngqiáng","动"],["占据","zhànjù","动"],["占有","zhànyǒu","动"],["针对","zhēnduì","动、介"],["正当","zhèngdàng","形"],["支撑","zhīchēng","动"],["职能","zhínéng","名"],["秩序","zhìxù","名"],["治理","zhìlǐ","动"],["制造","zhìzào","动"],["智慧","zhìhuì","名"],["中介","zhōngjiè","名"],["逐步","zhúbù","副"],["主观","zhǔguān","形"],["主权","zhǔquán","名"],["阻力","zǔlì","名"],["组织","zǔzhī","动、名"],["尊严","zūnyán","名"],["作出","zuòchū","动"]]};

const POS_EN = {"名":"Noun","动":"Verb","形":"Adj","副":"Adv","助":"Particle","数":"Num","代":"Pronoun","量":"Measure","连":"Conj","介":"Prep","叹":"Interj","前缀":"Prefix","后缀":"Suffix"};

function posEn(pos) {
  if (!pos) return "";
  return pos.split("、").map(p => POS_EN[p.trim()] || p.trim()).join(" / ");
}

const LEVELS = {
  1:{label:"HSK 1",desc:"Beginner",count:275,hue:0},
  2:{label:"HSK 2",desc:"Elementary",count:176,hue:25},
  3:{label:"HSK 3",desc:"Pre-Intermediate",count:470,hue:48},
  4:{label:"HSK 4",desc:"Intermediate",count:944,hue:140},
  5:{label:"HSK 5",desc:"Upper-Intermediate",count:1552,hue:210},
  6:{label:"HSK 6",desc:"Advanced",count:1754,hue:260},
  7:{label:"HSK 7–9",desc:"Mastery",count:5416,hue:320},
};

function hue(h,s=70,l=55){return `hsl(${h},${s}%,${l}%)`}
function hueA(h,s=70,l=55,a=1){return `hsla(${h},${s}%,${l}%,${a})`}

async function fetchCard(word, pinyin, pos, level) {
  // Get the word data from VOCAB_RAW
  const levelData = VOCAB_RAW[String(level)] || [];
  const wordData = levelData.find(item => item[0] === word && item[1] === pinyin);
  
  if (wordData && wordData.length >= 8) {
    return {
      meaning: wordData[3],
      sentence: wordData[4],
      sentencePinyin: wordData[5],
      translation: wordData[6],
      grammar: wordData[7]
    };
  }
  
  // Fallback if data not found
  return {
    meaning: "Meaning not available",
    sentence: "例句不可用。",
    sentencePinyin: "Lìjù bù kěyòng.",
    translation: "Example not available.",
    grammar: "Grammar notes not available."
  };
}

function Skeleton({ w = "100%", h = 16, r = 8, delay = 0 }) {
  return (
    <div style={{
      width: w, height: h, borderRadius: r,
      background: "rgba(255,255,255,0.07)",
      animation: `pulse 1.6s ease-in-out ${delay}s infinite`,
    }} />
  );
}

function CardFront({ card, cfg, cardInfo, loading, error }) {
  const charSize = card.word.length > 4 ? 56 : card.word.length > 2 ? 78 : 96;
  return (
    <div style={{
      ...faceBase,
      background: `radial-gradient(ellipse at 30% 20%, ${hueA(cfg.hue,40,20,0.9)}, ${hueA(cfg.hue,20,8,0.98)} 65%)`,
      border: `1px solid ${hueA(cfg.hue,50,45,0.2)}`,
      boxShadow: `0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px ${hueA(cfg.hue,50,45,0.08)}, inset 0 1px 0 rgba(255,255,255,0.07)`,
    }}>
      <div style={{
        position:"absolute", top:24, left:28,
        fontSize:10, letterSpacing:4, textTransform:"uppercase",
        color: hue(cfg.hue,65,65), opacity:0.8,
        fontFamily:"'Noto Sans SC', sans-serif",
      }}>{cfg.label}</div>

      {card.pos && (
        <div style={{
          position:"absolute", top:24, right:28,
          fontSize:11, color: hue(cfg.hue,60,70),
          background: hueA(cfg.hue,50,40,0.15),
          border:`1px solid ${hueA(cfg.hue,50,50,0.25)}`,
          borderRadius:20, padding:"3px 10px", letterSpacing:0.5,
        }}>{posEn(card.pos)}</div>
      )}

      <div style={{
        fontFamily:"'Noto Serif SC',serif", fontWeight:900,
        fontSize: charSize, color:"#fff", lineHeight:1,
        letterSpacing: card.word.length > 2 ? 6 : 2,
        textShadow:`0 0 60px ${hueA(cfg.hue,80,60,0.5)}, 0 2px 20px rgba(0,0,0,0.4)`,
        marginBottom:10,
      }}>{card.word}</div>

      {cardInfo
        ? <div style={{fontSize:15,color:hue(cfg.hue,50,75),fontStyle:"italic",marginBottom:24,opacity:0.9}}>{cardInfo.meaning}</div>
        : loading
          ? <Skeleton w={120} h={14} delay={0} />
          : <div style={{height:14, marginBottom:24}}/>
      }

      <div style={{width:48,height:1,background:hueA(cfg.hue,60,55,0.5),marginBottom:22}}/>

      {cardInfo ? (
        <div style={{textAlign:"center",padding:"0 8px"}}>
          <div style={{fontFamily:"'Noto Serif SC',serif",fontSize:18,color:"rgba(255,255,255,0.9)",lineHeight:1.8,marginBottom:8}}>{cardInfo.sentence}</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.38)",fontStyle:"italic",marginBottom:6}}>{cardInfo.sentencePinyin}</div>
          <div style={{fontSize:12,color:hue(cfg.hue,50,72),opacity:0.85}}>{cardInfo.translation}</div>
        </div>
      ) : loading ? (
        <div style={{display:"flex",flexDirection:"column",gap:10,width:"90%",alignItems:"center"}}>
          <Skeleton w="80%" h={16} delay={0} r={6} />
          <Skeleton w="65%" h={12} delay={0.1} r={5} />
          <Skeleton w="70%" h={12} delay={0.2} r={5} />
        </div>
      ) : error ? (
        <div style={{fontSize:12,color:"#ff6b6b",textAlign:"center",padding:"0 20px",opacity:0.85,lineHeight:1.6}}>{error}</div>
      ) : null}

      <div style={{
        position:"absolute",bottom:22,
        display:"flex",alignItems:"center",gap:6,
        fontSize:10,letterSpacing:3,textTransform:"uppercase",
        color:"rgba(255,255,255,0.18)",
      }}>
        <span style={{fontSize:15,opacity:0.6}}>↺</span> tap to flip
      </div>

      <div style={{
        position:"absolute",bottom:0,right:0,width:100,height:100,
        background:`radial-gradient(circle at 100% 100%, ${hueA(cfg.hue,60,40,0.12)}, transparent 70%)`,
        borderRadius:"24px 0",pointerEvents:"none",
      }}/>
    </div>
  );
}

function CardBack({ card, cfg, cardInfo, loading }) {
  return (
    <div style={{
      ...faceBase,
      transform:"rotateY(180deg)",
      justifyContent:"flex-start",
      alignItems:"flex-start",
      padding:"44px 32px 52px",
      background:`radial-gradient(ellipse at 70% 80%, ${hueA(cfg.hue,35,18,0.9)}, ${hueA(cfg.hue,20,7,0.98)} 65%)`,
      border:`1px solid ${hueA(cfg.hue,50,45,0.2)}`,
      boxShadow:`0 32px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)`,
    }}>

      <div style={{width:"100%",textAlign:"center",marginBottom:22}}>
        <div style={{
          fontSize:11,letterSpacing:4,textTransform:"uppercase",
          color:hue(cfg.hue,60,65),opacity:0.6,marginBottom:10,
          fontFamily:"'Noto Sans SC',sans-serif",
        }}>拼音 · Pronunciation</div>
        <div style={{
          fontSize:36,fontWeight:700,color:"#fff",letterSpacing:4,
          fontFamily:"'Cormorant Garamond',Georgia,serif",
          textShadow:`0 0 30px ${hueA(cfg.hue,70,55,0.4)}`,
        }}>{card.pinyin}</div>
        <div style={{
          fontFamily:"'Noto Serif SC',serif",fontSize:22,color:"rgba(255,255,255,0.6)",
          marginTop:6,letterSpacing:4,
        }}>{card.word}</div>
      </div>

      <div style={{width:"100%",height:1,background:hueA(cfg.hue,40,40,0.2),marginBottom:20}}/>

      <div style={{width:"100%",marginBottom:18}}>
        <div style={{
          fontSize:10,letterSpacing:3,textTransform:"uppercase",
          color:hue(cfg.hue,60,65),opacity:0.55,marginBottom:10,
          fontFamily:"'Noto Sans SC',sans-serif",
        }}>语法 · Grammar</div>
        {cardInfo ? (
          <div style={{
            borderLeft:`2px solid ${hueA(cfg.hue,65,55,0.7)}`,
            paddingLeft:14,
            background:`linear-gradient(to right, ${hueA(cfg.hue,40,30,0.15)}, transparent)`,
            borderRadius:"0 10px 10px 0",padding:"12px 14px",
          }}>
            <div style={{fontSize:14,color:"rgba(255,255,255,0.8)",lineHeight:1.8}}>{cardInfo.grammar}</div>
          </div>
        ) : loading ? (
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {[90,75,85,60].map((w,i)=><Skeleton key={i} w={`${w}%`} h={13} delay={i*0.12} r={5}/>)}
          </div>
        ) : null}
      </div>

      <div style={{width:"100%"}}>
        <div style={{
          fontSize:10,letterSpacing:3,textTransform:"uppercase",
          color:hue(cfg.hue,60,65),opacity:0.55,marginBottom:10,
          fontFamily:"'Noto Sans SC',sans-serif",
        }}>例句 · Example</div>
        {cardInfo ? (
          <div style={{
            background:hueA(cfg.hue,30,20,0.3),
            borderRadius:12,padding:"14px 16px",
            border:`1px solid ${hueA(cfg.hue,40,40,0.2)}`,
          }}>
            <div style={{fontFamily:"'Noto Serif SC',serif",fontSize:17,color:"rgba(255,255,255,0.9)",lineHeight:1.7,marginBottom:6}}>{cardInfo.sentence}</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.38)",fontStyle:"italic",marginBottom:4}}>{cardInfo.sentencePinyin}</div>
            <div style={{fontSize:12,color:hue(cfg.hue,55,72)}}>{cardInfo.translation}</div>
          </div>
        ) : loading ? (
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            <Skeleton w="85%" h={15} delay={0.4} r={6}/>
            <Skeleton w="65%" h={12} delay={0.5} r={5}/>
            <Skeleton w="70%" h={12} delay={0.6} r={5}/>
          </div>
        ) : null}
      </div>
    </div>
  );
}

const faceBase = {
  position:"absolute", width:"100%", minHeight:500,
  backfaceVisibility:"hidden", WebkitBackfaceVisibility:"hidden",
  borderRadius:20,
  display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
  padding:"52px 32px 52px",
};

export default function HSKApp() {
  const [level, setLevel]   = useState(1);
  const [idx, setIdx]       = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [shuffleOn, setShuffleOn] = useState(false);
  const [orderMap, setOrderMap]   = useState({});
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cardInfo, setCardInfo] = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const cache = useRef({});

  const cfg = LEVELS[level];
  const raw = VOCAB_RAW[String(level)] || [];

  const filtered = search.trim()
    ? raw.filter(([w,p]) => w.includes(search) || p.toLowerCase().includes(search.toLowerCase()))
    : raw;

  const getOrder = () => orderMap[level] && orderMap[level].length === filtered.length
    ? orderMap[level] : filtered.map((_,i)=>i);
  const ordered = getOrder().map(i => filtered[i]).filter(Boolean);
  const card = ordered[idx];
  const total = ordered.length;

  useEffect(() => {
    if (!card) return;
    const key = `${card[0]}|${level}`;
    if (cache.current[key]) { setCardInfo(cache.current[key]); setError(null); return; }
    setCardInfo(null); setError(null); setLoading(true);
    fetchCard(card[0], card[1], card[2], level)
      .then(d => { cache.current[key] = d; setCardInfo(d); setLoading(false); })
      .catch(e => { console.error(e); setError("Could not load — check connection and try again."); setLoading(false); });
  }, [card?.[0], level]);

  const go = useCallback((dir) => {
    setFlipped(false);
    setTimeout(() => setIdx(i => dir==="n" ? (i+1)%total : (i-1+total)%total), 160);
  }, [total]);

  useEffect(() => {
    const h = e => {
      if (e.key==="ArrowRight"||e.key==="ArrowDown") go("n");
      if (e.key==="ArrowLeft" ||e.key==="ArrowUp")   go("p");
      if (e.key===" "||e.key==="Enter") { e.preventDefault(); setFlipped(f=>!f); }
    };
    window.addEventListener("keydown",h); return ()=>window.removeEventListener("keydown",h);
  }, [go]);

  const changeLevel = l => { setLevel(l); setIdx(0); setFlipped(false); setSearch(""); };

  const toggleShuffle = () => {
    if (!shuffleOn) {
      const arr = filtered.map((_,i)=>i);
      for (let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}
      setOrderMap(m=>({...m,[level]:arr}));
    } else {
      setOrderMap(m=>({...m,[level]:null}));
    }
    setShuffleOn(!shuffleOn); setIdx(0); setFlipped(false);
  };

  const pct = total>0 ? ((idx+1)/total)*100 : 0;

  return (
    <div style={{
      minHeight:"100vh",background:"#080b10",
      display:"flex",flexDirection:"column",alignItems:"center",
      padding:"28px 16px 60px",fontFamily:"'Cormorant Garamond',Georgia,serif",
      overflow:"hidden",position:"relative",
    }}>
      <div style={{
        position:"fixed",width:700,height:700,borderRadius:"50%",
        background:`radial-gradient(circle, ${hueA(cfg.hue,60,30,0.12)} 0%, transparent 70%)`,
        top:"5%",left:"50%",transform:"translateX(-50%)",
        pointerEvents:"none",transition:"background 0.8s ease",zIndex:0,
      }}/>

      <div style={{textAlign:"center",marginBottom:24,zIndex:1,position:"relative"}}>
        <div style={{
          fontFamily:"'Noto Serif SC',serif",fontSize:10,
          letterSpacing:7,color:hue(cfg.hue,60,65),
          textTransform:"uppercase",opacity:0.7,marginBottom:5,
        }}>汉字学习卡片</div>
        <div style={{fontSize:26,fontWeight:300,color:"rgba(255,255,255,0.92)",letterSpacing:2}}>
          HSK Flashcards
        </div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.28)",marginTop:3,letterSpacing:1}}>
          {cfg.desc} · {total.toLocaleString()} words
        </div>
      </div>

      <div style={{
        display:"flex",flexWrap:"wrap",justifyContent:"center",
        gap:4,marginBottom:20,zIndex:1,position:"relative",
        background:"rgba(255,255,255,0.03)",padding:5,borderRadius:50,
        border:"1px solid rgba(255,255,255,0.06)",
      }}>
        {Object.entries(LEVELS).map(([l,c])=>{
          const active = level===+l;
          return (
            <button key={l} onClick={()=>changeLevel(+l)} style={{
              padding:"6px 14px",borderRadius:30,border:"none",cursor:"pointer",
              fontFamily:"'Cormorant Garamond',serif",fontSize:13,letterSpacing:0.5,
              transition:"all 0.3s ease",
              background: active ? hue(+l===7?c.hue:c.hue,65,48) : "transparent",
              color: active ? "#fff" : "rgba(255,255,255,0.38)",
              boxShadow: active ? `0 4px 18px ${hueA(c.hue,60,40,0.4)}` : "none",
              fontWeight: active ? 600 : 400,
            }}>{c.label}</button>
          );
        })}
      </div>

      <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:20,zIndex:1,position:"relative"}}>
        {showSearch ? (
          <input
            autoFocus value={search}
            onChange={e=>{setSearch(e.target.value);setIdx(0);setFlipped(false);}}
            onBlur={()=>{ if(!search) setShowSearch(false); }}
            placeholder="Search character or pīnyīn…"
            style={{
              background:"rgba(255,255,255,0.07)",border:`1px solid ${hueA(cfg.hue,55,50,0.5)}`,
              borderRadius:20,padding:"6px 16px",color:"#fff",fontSize:14,
              fontFamily:"'Cormorant Garamond',serif",outline:"none",width:220,
              transition:"border 0.2s",
            }}/>
        ) : (
          <Btn onClick={()=>setShowSearch(true)} hue={cfg.hue}>🔍 Search</Btn>
        )}
        <Btn onClick={toggleShuffle} hue={cfg.hue} active={shuffleOn}>⇌ Shuffle</Btn>
        <Btn onClick={()=>{ if(card) { const k=`${card[0]}|${level}`; delete cache.current[k]; setCardInfo(null); setError(null); setLoading(true); fetchCard(card[0],card[1],card[2],level).then(d=>{cache.current[k]=d;setCardInfo(d);setLoading(false);}).catch(e=>{setError("Failed to reload.");setLoading(false);}); } }} hue={cfg.hue}>↻ Reload</Btn>
      </div>

      {card ? (
        <div
          onClick={()=>setFlipped(f=>!f)}
          style={{
            width:"100%",maxWidth:430,minHeight:500,
            perspective:1500,cursor:"pointer",
            position:"relative",zIndex:1,userSelect:"none",
          }}
        >
          <div style={{
            width:"100%",minHeight:500,position:"relative",
            transformStyle:"preserve-3d",
            transition:"transform 0.75s cubic-bezier(0.3,0.1,0.2,1)",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}>
            <CardFront card={{word:card[0],pinyin:card[1],pos:card[2]}} cfg={cfg} cardInfo={cardInfo} loading={loading} error={error}/>
            <CardBack  card={{word:card[0],pinyin:card[1],pos:card[2]}} cfg={cfg} cardInfo={cardInfo} loading={loading}/>
          </div>
        </div>
      ) : (
        <div style={{
          width:"100%",maxWidth:430,height:500,
          display:"flex",alignItems:"center",justifyContent:"center",
          color:"rgba(255,255,255,0.3)",fontSize:15,
        }}>
          No cards found{search ? ` for "${search}"` : ""}.
        </div>
      )}

      <div style={{display:"flex",alignItems:"center",gap:20,marginTop:28,zIndex:1,position:"relative"}}>
        <NavBtn onClick={()=>go("p")} hue={cfg.hue}>←</NavBtn>
        <div style={{textAlign:"center",minWidth:80}}>
          <div style={{fontSize:26,fontWeight:300,color:"rgba(255,255,255,0.85)",lineHeight:1}}>
            {(idx+1).toLocaleString()}
          </div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.28)",letterSpacing:1,marginTop:2}}>
            of {total.toLocaleString()}
          </div>
        </div>
        <NavBtn onClick={()=>go("n")} hue={cfg.hue}>→</NavBtn>
      </div>

      <div style={{
        width:"100%",maxWidth:430,height:2,
        background:"rgba(255,255,255,0.07)",borderRadius:2,
        marginTop:14,overflow:"hidden",position:"relative",zIndex:1,
      }}>
        <div style={{
          height:"100%",borderRadius:2,
          background:`linear-gradient(to right, ${hue(cfg.hue,65,40)}, ${hue(cfg.hue,75,60)})`,
          width:`${pct}%`,transition:"width 0.4s ease",
          boxShadow:`0 0 8px ${hueA(cfg.hue,70,55,0.6)}`,
        }}/>
      </div>

     <div style={{
  marginTop:12,fontSize:10,color:"rgba(255,255,255,0.18)",
  letterSpacing:2,textAlign:"center",zIndex:1,position:"relative",
}}>
  <div style={{marginBottom:8}}>Created by sadir</div>
  <div>← → Navigate &nbsp;·&nbsp; Space / Enter = Flip</div>
</div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700;900&family=Noto+Sans+SC:wght@300;400&family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300&display=swap');
        @keyframes pulse { 0%,100%{opacity:0.35} 50%{opacity:0.7} }
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.12);border-radius:2px}
      `}</style>
    </div>
  );
}

function Btn({ children, onClick, hue: h, active }) {
  return (
    <button onClick={onClick} style={{
      padding:"5px 14px",borderRadius:20,cursor:"pointer",
      fontFamily:"'Cormorant Garamond',serif",fontSize:13,letterSpacing:0.5,
      transition:"all 0.2s",
      background: active ? hueA(h,55,40,0.4) : "rgba(255,255,255,0.04)",
      border: `1px solid ${active ? hueA(h,55,50,0.6) : "rgba(255,255,255,0.1)"}`,
      color: active ? hue(h,60,72) : "rgba(255,255,255,0.5)",
    }}>{children}</button>
  );
}
function NavBtn({ children, onClick, hue: h }) {
  return (
    <button onClick={onClick} style={{
      width:48,height:48,borderRadius:"50%",cursor:"pointer",
      background:"rgba(255,255,255,0.04)",
      border:`1px solid ${hueA(h,40,45,0.25)}`,
      color:"rgba(255,255,255,0.65)",fontSize:18,
      display:"flex",alignItems:"center",justifyContent:"center",
      transition:"all 0.2s",fontFamily:"monospace",
    }}>{children}</button>
  );
}