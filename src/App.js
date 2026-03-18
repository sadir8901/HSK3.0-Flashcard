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
"2":[["啊","a","助"],["爱好","àihào","动、名"],["白色","báisè","名"],["帮助","bāngzhù","动、名"],["被","bèi","介"],["比","bǐ","介、动"],["必须","bìxū","助动、副"],["变化","biànhuà","动、名"],["表示","biǎoshì","动"],["冰箱","bīngxiāng","名"],["不但","bùdàn","连"],["不同","bùtóng","形"],["菜单","càidān","名"],["长","cháng","形"],["超过","chāoguò","动"],["成绩","chéngjì","名"],["城市","chéngshì","名"],["出发","chūfā","动"],["春","chūn","名"],["打扫","dǎsǎo","动"],["打算","dǎsuàn","动、名"],["但是","dànshì","连"],["当然","dāngrán","副"],["地方","dìfang","名"],["地铁","dìtiě","名"],["地图","dìtú","名"],["第一","dì yī","数"],["东","dōng","名"],["动物","dòngwù","名"],["段","duàn","量"],["锻炼","duànliàn","动"],["对","duì","介、形"],["而且","érqiě","连"],["发现","fāxiàn","动"],["方向","fāngxiàng","名"],["房间","fángjiān","名"],["放","fàng","动"],["非常","fēicháng","副"],["分","fēn","量、名"],["服务员","fúwùyuán","名"],["附近","fùjìn","名"],["复习","fùxí","动"],["干净","gānjìng","形"],["感觉","gǎnjué","动、名"],["感冒","gǎnmào","动、名"],["感谢","gǎnxiè","动"],["高","gāo","形"],["各","gè","代"],["公里","gōnglǐ","量"],["公司","gōngsī","名"],["公园","gōngyuán","名"],["关系","guānxi","名"],["关注","guānzhù","动"],["国家","guójiā","名"],["果汁","guǒzhī","名"],["过去","guòqù","名"],["还是","háishi","连、副"],["合适","héshì","形"],["护照","hùzhào","名"],["花","huā","名、动"],["环境","huánjìng","名"],["换","huàn","动"],["黄色","huángsè","名"],["会议","huìyì","名"],["或者","huòzhě","连"],["机会","jīhuì","名"],["季节","jìjié","名"],["记得","jìde","动"],["检查","jiǎnchá","动"],["简单","jiǎndān","形"],["见面","jiàn miàn",""],["教","jiāo","动"],["结婚","jié hūn",""],["结束","jiéshù","动"],["节目","jiémù","名"],["节日","jiérì","名"],["借","jiè","动"],["介绍","jièshào","动"],["进","jìn","动"],["经常","jīngcháng","副"],["经过","jīngguò","动、介"],["旧","jiù","形"],["举行","jǔxíng","动"],["可能","kěnéng","助动、形、副"],["可以","kěyǐ","助动"],["刻","kè","量"],["客人","kèrén","名"],["空调","kōngtiáo","名"],["口","kǒu","量"],["块","kuài","量"],["快","kuài","形、副"],["筷子","kuàizi","名"],["蓝色","lánsè","名"],["老","lǎo","形"],["离","lí","介"],["礼物","lǐwù","名"],["历史","lìshǐ","名"],["练习","liànxí","动、名"],["楼","lóu","名、量"],["路","lù","名、量"],["旅游","lǚyóu","动"],["绿色","lǜsè","名"],["马上","mǎshàng","副"],["满意","mǎnyì","形"],["慢","màn","形"],["帽子","màozi","名"],["每","měi","代"],["门口","ménkǒu","名"],["面条","miàntiáo","名"],["明白","míngbai","形、动"],["拿","ná","动"],["奶奶","nǎinai","名"],["南","nán","名"],["难","nán","形"],["难过","nánguò","形"],["你好","nǐ hǎo",""],["年级","niánjí","名"],["努力","nǔlì","形、动"],["爬山","pá shān",""],["盘子","pánzi","名"],["旁边","pángbiān","名"],["跑步","pǎo bù",""],["皮鞋","píxié","名"],["便宜","piányí","形"],["票","piào","名"],["瓶子","píngzi","名"],["其他","qítā","代"],["其中","qízhōng","代"],["骑","qí","动"],["起床","qǐ chuáng",""],["起来","qǐlai","动"],["铅笔","qiānbǐ","名"],["清楚","qīngchu","形"],["秋","qiū","名"],["然后","rán hòu","连"],["认为","rènwéi","动"],["日记","rìjì","名"],["如果","rúguǒ","连"],["伞","sǎn","名"],["上班","shàng bān",""],["身体","shēntǐ","名"],["生气","shēng qì",""],["声音","shēngyīn","名"],["世界","shìjiè","名"],["事情","shìqing","名"],["手表","shǒubiǎo","名"],["瘦","shòu","形"],["树","shù","名"],["数学","shùxué","名"],["双","shuāng","量"],["虽然","suīrán","连"],["所以","suǒyǐ","连"],["它","tā","代"],["她们","tāmen","代"],["他们","tāmen","代"],["太阳","tàiyáng","名"],["特别","tèbié","形、副"],["疼","téng","形"],["体育","tǐyù","名"],["天","tiān","量、名"],["条","tiáo","量"],["通过","tōngguò","动、介"],["同事","tóngshì","名"],["推","tuī","动"],["腿","tuǐ","名"],["完成","wánchéng","动"],["晚","wǎn","形"],["为什么","wèi shénme",""],["问题","wèntí","名"],["西","xī","名"],["洗","xǐ","动"],["洗手间","xǐshǒujiān","名"],["下","xià","名"],["先","xiān","副"],["向","xiàng","介"],["相信","xiāngxìn","动"],["小时候","xiǎo shíhou",""],["笑","xiào","动"],["新","xīn","形"],["新闻","xīnwén","名"],["行李箱","xínglǐxiāng","名"],["需要","xūyào","动、助动"],["选择","xuǎnzé","动、名"],["要求","yāoqiú","动、名"],["也","yě","副"],["以后","yǐhòu","名"],["以前","yǐqián","名"],["意思","yìsi","名"],["一起","yīqǐ","副"],["一样","yīyàng","形"],["游泳","yóuyǒng","动"],["右边","yòubian","名"],["鱼","yú","名"],["遇到","yùdào","动"],["越来越","yuèláiyuè","副"],["运动","yùndòng","动、名"],["再","zài","副"],["站","zhàn","动、名"],["长城","Chángchéng","名"],["照顾","zhàogu","动"],["照片","zhàopiàn","名"],["找","zhǎo","动"],["这里","zhèlǐ","代"],["着","zhe","助"],["真","zhēn","副"],["知道","zhīdào","动"],["只","zhǐ","副"],["中间","zhōngjiān","名"],["重要","zhòngyào","形"],["总是","zǒngshì","副"],["嘴","zuǐ","名"],["左边","zuǒbian","名"]],"3":[["矮","ǎi","形"],["爱人","àiren","名"],["安静","ānjìng","形"],["按时","ànshí","副"],["把","bǎ","介"],["搬","bān","动"],["棒","bàng","形"],["包","bāo","名、量"],["抱","bào","动"],["抱歉","bàoqiàn","形"],["北方","běifāng","名"],["北京","Běijīng","名"],["倍","bèi","量"],["笨","bèn","形"],["比较","bǐjiào","副、动"],["比赛","bǐsài","动、名"],["毕业","bì yè",""],["表示","biǎoshì","动"],["表扬","biǎoyáng","动"],["别","bié","副"],["冰","bīng","名"],["部分","bùfen","名"],["擦","cā","动"],["猜","cāi","动"],["才","cái","副"],["参观","cānguān","动"],["草","cǎo","名"],["层","céng","量"],["差","chà","形"],["超市","chāoshì","名"],["衬衫","chènshān","名"],["成功","chénggōng","动、形"],["成为","chéngwéi","动"],["迟到","chídào","动"],["除了","chúle","介"],["传真","chuánzhēn","名"],["窗户","chuānghù","名"],["春节","Chūnjié","名"],["词语","cíyǔ","名"],["聪明","cōngmíng","形"],["存","cún","动"],["错","cuò","形"],["打扰","dǎrǎo","动"],["打算","dǎsuàn","动、名"],["大夫","dàifu","名"],["当","dāng","动、介"],["灯","dēng","名"],["等","děng","动、助"],["低","dī","形"],["地方","dìfang","名"],["掉","diào","动"],["调查","diàochá","动、名"],["东北","dōngběi","名"],["懂","dǒng","动"],["豆腐","dòufu","名"],["堵车","dǔ chē",""],["段","duàn","量"],["对面","duìmiàn","名"],["多久","duō jiǔ",""],["多么","duōme","副"],["饿","è","形"],["发烧","fā shāo",""],["发现","fāxiàn","动"],["翻译","fānyì","动、名"],["方法","fāngfǎ","名"],["房子","fángzi","名"],["放心","fàng xīn",""],["分","fēn","动"],["丰富","fēngfù","形、动"],["否则","fǒuzé","连"],["夫妻","fūqī","名"],["父母","fùmǔ","名"],["父亲","fùqīn","名"],["复印","fùyìn","动"],["该","gāi","助动"],["感情","gǎnqíng","名"],["干","gàn","动"],["刚才","gāngcái","名"],["高速公路","gāosù gōnglù","名"],["胳膊","gēbo","名"],["根据","gēnjù","介"],["公斤","gōngjīn","量"],["共同","gòngtóng","形、副"],["鼓励","gǔlì","动"],["故意","gùyì","副"],["刮风","guā fēng",""],["管理","guǎnlǐ","动、名"],["广播","guǎngbō","动、名"],["广告","guǎnggào","名"],["国籍","guójí","名"],["国内","guónèi","名"],["果然","guǒrán","副"],["过","guò","动"],["还","hái","副"],["害怕","hàipà","动"],["寒假","hánjià","名"],["好像","hǎoxiàng","副"],["护士","hùshi","名"],["互联网","hùliánwǎng","名"],["互相","hùxiāng","副"],["花","huā","名、动"],["画","huà","动、名"],["坏","huài","形"],["欢迎","huānyíng","动"],["活动","huódòng","名、动"],["活泼","huópō","形"],["火","huǒ","名"],["极","jí","副"],["即使","jíshǐ","连"],["及时","jíshí","形、副"],["记","jì","动"],["寄","jì","动"],["加","jiā","动"],["加油站","jiāyóuzhàn","名"],["坚持","jiānchí","动"],["减少","jiǎnshǎo","动"],["见面","jiàn miàn",""],["健康","jiànkāng","名、形"],["将来","jiānglái","名"],["讲","jiǎng","动"],["接","jiē","动"],["角色","juésè","名"],["据说","jùshuō","副"],["决定","juédìng","动、名"],["开玩笑","kāi wánxiào",""],["开心","kāixīn","形"],["看法","kànfǎ","名"],["可爱","kě'ài","形"],["可怜","kělián","形"],["空气","kōngqì","名"],["苦","kǔ","形"],["块","kuài","量"],["困","kùn","形"],["离开","líkāi","动"],["礼貌","lǐmào","名、形"],["厉害","lìhai","形"],["连","lián","连、介"],["聊天","liáo tiān",""],["留学","liú xué",""],["楼梯","lóutī","名"],["落","luò","动"],["律师","lǜshī","名"],["满","mǎn","形"],["忙","máng","形"],["矛盾","máodùn","名、形"],["美丽","měilì","形"],["迷路","mí lù",""],["秘密","mìmì","名"],["免费","miǎn fèi",""],["面积","miànjī","名"],["母亲","mǔqīn","名"],["年龄","niánlíng","名"],["爬","pá","动"],["排队","pái duì",""],["批评","pīpíng","动、名"],["皮肤","pífū","名"],["普通话","Pǔtōnghuà","名"],["其次","qícì","连"],["骑","qí","动"],["签证","qiānzhèng","名"],["巧克力","qiǎokèlì","名"],["亲爱","qīn'ài","形"],["轻松","qīngsōng","形"],["情况","qíngkuàng","名"],["请假","qǐng jià",""],["取","qǔ","动"],["全部","quánbù","代"],["却","què","副"],["热情","rèqíng","形、名"],["认真","rènzhēn","形"],["日出","rìchū","名"],["容易","róngyì","形"],["如","rú","动、连"],["散步","sàn bù",""],["伤心","shāng xīn",""],["上网","shàng wǎng",""],["设计","shèjì","动、名"],["申请","shēnqǐng","动、名"],["甚至","shènzhì","副、连"],["生产","shēngchǎn","动、名"],["失望","shīwàng","动、形"],["实际","shíjì","名、形"],["实在","shízài","副"],["使","shǐ","动"],["世纪","shìjì","名"],["首都","shǒudū","名"],["受","shòu","动"],["输","shū","动"],["数量","shùliàng","名"],["数字","shùzì","名"],["顺便","shùnbiàn","副"],["顺序","shùnxù","名"],["说明","shuōmíng","动、名"],["思念","sīniàn","动"],["松","sōng","形"],["宿舍","sùshè","名"],["虽然","suīrán","连"],["酸","suān","形"],["岁","suì","量"],["随便","suíbiàn","形、副"],["所有","suǒyǒu","代"],["态度","tàidù","名"],["谈","tán","动"],["提","tí","动"],["题目","tímù","名"],["填写","tiánxiě","动"],["条件","tiáojiàn","名"],["跳舞","tiào wǔ",""],["停","tíng","动"],["通知","tōngzhī","动、名"],["推","tuī","动"],["完全","wánquán","副"],["网站","wǎngzhàn","名"],["往","wǎng","介"],["为","wèi","介"],["文化","wénhuà","名"],["文章","wénzhāng","名"],["闻","wén","动"],["误会","wùhuì","动、名"],["西方","xīfāng","名"],["系","xì","名"],["现代","xiàndài","名、形"],["限制","xiànzhì","动、名"],["相同","xiāngtóng","形"],["享受","xiǎngshòu","动、名"],["消费","xiāofèi","动、名"],["心情","xīnqíng","名"],["兴奋","xīngfèn","形"],["行","xíng","动、形"],["许多","xǔduō","代"],["研究","yánjiū","动、名"],["严格","yángé","形"],["严重","yánzhòng","形"],["演出","yǎnchū","动、名"],["眼泪","yǎnlèi","名"],["要是","yàoshi","连"],["一般","yībān","形、副"],["一边","yībiān","副"],["一定","yīdìng","形、副"],["一共","yīgòng","副"],["以为","yǐwéi","动"],["一直","yīzhí","副"],["印象","yìnxiàng","名"],["赢","yíng","动"],["影响","yǐngxiǎng","动、名"],["应该","yīnggāi","助动"],["用","yòng","动、介"],["邮件","yóujiàn","名"],["邮局","yóujú","名"],["有名","yǒumíng","形"],["又","yòu","副"],["于是","yúshì","连"],["原来","yuánlái","副、形"],["原谅","yuánliàng","动"],["愿意","yuànyì","助动"],["阅读","yuèdú","动"],["月亮","yuèliang","名"],["约会","yuēhuì","名"],["再次","zàicì","副"],["早","zǎo","形"],["增加","zēngjiā","动"],["占线","zhàn xiàn",""],["正确","zhèngquè","形"],["正式","zhèngshì","形"],["指","zhǐ","动"],["只好","zhǐhǎo","副"],["着急","zháojí","形"],["周末","zhōumò","名"],["猪","zhū","名"],["注意","zhùyì","动"],["准时","zhǔnshí","形"],["总结","zǒngjié","动、名"],["尊重","zūnzhòng","动"]],"4":[["啊","ā","叹"],["爱情","àiqíng","名"],["安慰","ānwèi","动"],["安心","ān xīn",""],["暗","àn","形"],["按照","ànzhào","介"],["把握","bǎwò","动、名"],["白","bái","形"],["百分之","bǎifēnzhī",""],["般","bān","形"],["宝贝","bǎobèi","名、形"],["保证","bǎozhèng","动、名"],["报道","bàodào","动、名"],["报名","bào míng",""],["背","bèi","动"],["本来","běnlái","副、形"],["笔记本","bǐjìběn","名"],["毕竟","bìjìng","副"],["便","biàn","副"],["标准","biāozhǔn","名、形"],["表达","biǎodá","动"],["表格","biǎogé","名"],["表演","biǎoyǎn","动、名"],["表现","biǎoxiàn","动、名"],["博士","bóshì","名"],["补充","bǔchōng","动"],["不安","bù'ān","形"],["不得不","bùdébù","副"],["不管","bùguǎn","连"],["不论","bùlùn","连"],["不满","bùmǎn","形"],["材料","cáiliào","名"],["彩虹","cǎihóng","名"],["参加","cānjiā","动"],["参考","cānkǎo","动"],["操","cāo","动"],["策略","cèlüè","名"],["长途","chángtú","形"],["朝","cháo","介"],["吵架","chǎo jià",""],["车辆","chēliàng","名"],["成功","chénggōng","动、形"],["成绩","chéngjì","名"],["成立","chénglì","动"],["诚实","chéngshí","形"],["冲","chōng","动"],["重复","chóngfù","动"],["出现","chūxiàn","动"],["出差","chū chāi",""],["传递","chuándì","动"],["存在","cúnzài","动"],["打招呼","dǎ zhāohu",""],["大约","dàyuē","副"],["代表","dàibiǎo","动、名"],["当地","dāngdì","名"],["倒","dào","动"],["道德","dàodé","名"],["登记","dēngjì","动"],["等等","děngděng","助"],["底","dǐ","名"],["地球","dìqiú","名"],["地址","dìzhǐ","名"],["点击","diǎnjī","动"],["电子","diànzǐ","名"],["丢","diū","动"],["堆","duī","量、名"],["对待","duìdài","动"],["对方","duìfāng","名"],["对于","duìyú","介"],["顿","dùn","量"],["发展","fāzhǎn","动、名"],["法律","fǎlǜ","名"],["反对","fǎnduì","动"],["反应","fǎnyìng","动、名"],["返回","fǎnhuí","动"],["方式","fāngshì","名"],["方向盘","fāngxiàngpán","名"],["放弃","fàngqì","动"],["负责","fùzé","动、形"],["付","fù","动"],["复杂","fùzá","形"],["父母","fùmǔ","名"],["改变","gǎibiàn","动"],["感动","gǎndòng","形"],["刚","gāng","副"],["高楼","gāolóu","名"],["告别","gàobié","动"],["各自","gèzì","代"],["功能","gōngnéng","名"],["恭喜","gōngxǐ","动"],["估计","gūjì","动、名"],["故障","gùzhàng","名"],["观点","guāndiǎn","名"],["关于","guānyú","介"],["光","guāng","名、形"],["广","guǎng","形"],["广场","guǎngchǎng","名"],["过期","guò qī",""],["海","hǎi","名"],["害羞","hàixiū","形"],["喊","hǎn","动"],["好处","hǎochù","名"],["好奇","hàoqí","形"],["呼吸","hūxī","动"],["后来","hòulái","名"],["后退","hòutuì","动"],["花费","huāfèi","动、名"],["话题","huàtí","名"],["幻想","huànxiǎng","动、名"],["回忆","huíyì","动、名"],["火","huǒ","名"],["积极","jījí","形"],["积累","jīlěi","动"],["基本","jīběn","形、副"],["吉祥","jíxiáng","形"],["技术","jìshù","名"],["既然","jìrán","连"],["减","jiǎn","动"],["接触","jiēchù","动"],["接受","jiēshòu","动"],["结果","jiéguǒ","名、连"],["尽管","jǐnguǎn","连、副"],["进步","jìnbù","动、名"],["进行","jìnxíng","动"],["近","jìn","形"],["经历","jīnglì","动、名"],["竟然","jìngrán","副"],["警察","jǐngchá","名"],["敬","jìng","动"],["究竟","jiūjìng","副"],["就算","jiùsuàn","连"],["举例","jǔ lì",""],["具体","jùtǐ","形"],["开发","kāifā","动"],["开始","kāishǐ","动、名"],["克服","kèfú","动"],["空","kōng","形"],["恐怕","kǒngpà","副"],["困难","kùnnan","名、形"],["浪费","làngfèi","动"],["浪漫","làngmàn","形"],["力量","lìliang","名"],["理解","lǐjiě","动、名"],["理想","lǐxiǎng","名、形"],["厉害","lìhai","形"],["联系","liánxì","动、名"],["领导","lǐngdǎo","动、名"],["流行","liúxíng","动、形"],["留","liú","动"],["逻辑","luójí","名"],["落后","luòhòu","动、形"],["民族","mínzú","名"],["面对","miànduì","动"],["命运","mìngyùn","名"],["目前","mùqián","名"],["哦","ó","叹"],["偶尔","ǒu'ěr","副"],["批评","pīpíng","动、名"],["拼音","pīnyīn","名"],["普遍","pǔbiàn","形"],["期间","qījiān","名"],["期望","qīwàng","动、名"],["强","qiáng","形"],["千","qiān","数"],["签","qiān","动"],["勤奋","qínfèn","形"],["请求","qǐngqiú","动、名"],["情绪","qíngxù","名"],["全面","quánmiàn","形"],["确","què","副"],["确定","quèdìng","动、形"],["认可","rènkě","动"],["任何","rènhé","代"],["任务","rènwu","名"],["任意","rènyì","形"],["日常","rìcháng","形"],["如何","rúhé","代"],["入","rù","动"],["生活","shēnghuó","动、名"],["胜利","shènglì","动、名"],["实现","shíxiàn","动"],["收入","shōurù","名"],["社会","shèhuì","名"],["失败","shībài","动、名"],["时代","shídài","名"],["随便","suíbiàn","形、副"],["随着","suízhe","介"],["损失","sǔnshī","动、名"],["讨论","tǎolùn","动、名"],["提高","tígāo","动"],["提醒","tíxǐng","动"],["条件","tiáojiàn","名"],["听说","tīngshuō","动"],["同意","tóngyì","动"],["突然","tūrán","形、副"],["推广","tuīguǎng","动"],["网络","wǎngluò","名"],["危险","wēixiǎn","形、名"],["为了","wèile","介"],["温度","wēndù","名"],["文件","wénjiàn","名"],["问候","wènhòu","动"],["无论","wúlùn","连"],["相当","xiāngdāng","形、副"],["响","xiǎng","动"],["效果","xiàoguǒ","名"],["信息","xìnxī","名"],["形式","xíngshì","名"],["虚心","xūxīn","形"],["学科","xuékē","名"],["要么","yàome","连"],["也就是说","yě jiùshì shuō",""],["一方面","yī fāngmiàn",""],["遗憾","yíhàn","形、名"],["以及","yǐjí","连"],["意识","yìshí","名、动"],["意义","yìyì","名"],["因此","yīncǐ","连"],["应聘","yìngpìn","动"],["拥抱","yōngbào","动"],["拥有","yōngyǒu","动"],["优秀","yōuxiù","形"],["由于","yóuyú","连、介"],["友好","yǒuhǎo","形"],["有趣","yǒuqù","形"],["愉快","yúkuài","形"],["欲望","yùwàng","名"],["原因","yuányīn","名"],["约","yuē","动、副"],["赞美","zànměi","动"],["增长","zēngzhǎng","动"],["珍惜","zhēnxī","动"],["整理","zhěnglǐ","动"],["正常","zhèngcháng","形"],["支持","zhīchí","动、名"],["最终","zuìzhōng","副"],["遵守","zūnshǒu","动"]],"5":[["唉","ài","叹"],["哎","āi","叹"],["爱护","àihù","动"],["爱惜","àixī","动"],["爱心","àixīn","名"],["安排","ānpái","动、名"],["安全","ānquán","形、名"],["暗示","ànshì","动、名"],["熬夜","áo yè",""],["把握","bǎwò","动、名"],["白白","báibái","副"],["摆","bǎi","动"],["版本","bǎnběn","名"],["帮忙","bāng máng",""],["包含","bāohán","动"],["报告","bàogào","动、名"],["保持","bǎochí","动"],["倍","bèi","量"],["背景","bèijǐng","名"],["辩论","biànlùn","动、名"],["标志","biāozhì","名、动"],["表格","biǎogé","名"],["博客","bókè","名"],["部门","bùmén","名"],["财产","cáichǎn","名"],["财富","cáifù","名"],["才能","cáinéng","名"],["操作","cāozuò","动"],["策略","cèlüè","名"],["曾经","céngjīng","副"],["成分","chéngfèn","名"],["成就","chéngjiù","名"],["成熟","chéngshú","形、动"],["持续","chíxù","动"],["传播","chuánbō","动"],["创新","chuàngxīn","动、名"],["创造","chuàngzào","动"],["词汇","cíhuì","名"],["从事","cóngshì","动"],["大量","dàliàng","形"],["大型","dàxíng","形"],["大多数","dàduōshù","名"],["答案","dá'àn","名"],["单位","dānwèi","名"],["当心","dāng xīn",""],["道理","dàolǐ","名"],["得罪","dézuì","动"],["等待","děngdài","动"],["敌人","dírén","名"],["地位","dìwèi","名"],["调节","tiáojié","动"],["定期","dìngqī","形、副"],["动作","dòngzuò","名"],["多余","duōyú","形"],["而","ér","连"],["发挥","fāhuī","动"],["发明","fāmíng","动、名"],["发布","fābù","动"],["繁忙","fánmáng","形"],["方式","fāngshì","名"],["方向","fāngxiàng","名"],["分配","fēnpèi","动"],["分析","fēnxī","动、名"],["符合","fúhé","动"],["幅","fú","量"],["改革","gǎigé","动、名"],["概念","gàiniàn","名"],["感受","gǎnshòu","动、名"],["高度","gāodù","名、形"],["个人","gèrén","名"],["个性","gèxìng","名"],["根本","gēnběn","名、形、副"],["工程","gōngchéng","名"],["公平","gōngpíng","形"],["贡献","gòngxiàn","动、名"],["沟通","gōutōng","动"],["估计","gūjì","动、名"],["规律","guīlǜ","名"],["规模","guīmó","名"],["规则","guīzé","名"],["好奇","hàoqí","形"],["合理","hélǐ","形"],["核心","héxīn","名"],["何况","hékuàng","连"],["环保","huánbǎo","名、形"],["回复","huífù","动"],["机制","jīzhì","名"],["激励","jīlì","动"],["即将","jíjiāng","副"],["既然","jìrán","连"],["记忆","jìyì","名、动"],["技能","jìnéng","名"],["坚定","jiāndìng","形、动"],["简洁","jiǎnjié","形"],["建立","jiànlì","动"],["建设","jiànshè","动"],["建议","jiànyì","动、名"],["讲究","jiǎngjiu","动、形"],["交流","jiāoliú","动、名"],["交往","jiāowǎng","动"],["结构","jiégòu","名"],["解决","jiějué","动"],["解释","jiěshì","动、名"],["机会","jīhuì","名"],["进一步","jìnyībù","副"],["积极性","jījíxìng","名"],["具备","jùbèi","动"],["聚集","jùjí","动"],["具体","jùtǐ","形"],["竞争","jìngzhēng","动、名"],["来自","láizì","动"],["理由","lǐyóu","名"],["立即","lìjí","副"],["留下","liúxia","动"],["领域","lǐngyù","名"],["论文","lùnwén","名"],["面临","miànlín","动"],["明显","míngxiǎn","形"],["模式","móshì","名"],["能力","nénglì","名"],["内容","nèiróng","名"],["目标","mùbiāo","名"],["排除","páichú","动"],["判断","pànduàn","动、名"],["培养","péiyǎng","动"],["平衡","pínghéng","动、形"],["评价","píngjià","动、名"],["普及","pǔjí","动"],["前景","qiánjǐng","名"],["强调","qiángdiào","动"],["确保","quèbǎo","动"],["认识","rènshi","动、名"],["人才","réncái","名"],["社区","shèqū","名"],["深入","shēnrù","形、动"],["审美","shěnměi","动"],["生态","shēngtài","名"],["实际上","shíjìshàng","副"],["时机","shíjī","名"],["事实","shìshí","名"],["数据","shùjù","名"],["素质","sùzhì","名"],["体现","tǐxiàn","动"],["提出","tíchū","动"],["途径","tújìng","名"],["推进","tuījìn","动"],["完善","wánshàn","动、形"],["维护","wéihù","动"],["文明","wénmíng","名、形"],["问卷","wènjuàn","名"],["现象","xiànxiàng","名"],["相互","xiānghù","副"],["心理","xīnlǐ","名"],["形成","xíngchéng","动"],["需求","xūqiú","名"],["研究","yánjiū","动、名"],["严肃","yánsù","形"],["印象深刻","yìnxiàng shēnkè",""],["应对","yìngduì","动"],["影响","yǐngxiǎng","动、名"],["因素","yīnsù","名"],["有效","yǒuxiào","形"],["意外","yìwài","形、名"],["运用","yùnyòng","动"],["整体","zhěngtǐ","名、形"],["制度","zhìdù","名"],["种类","zhǒnglèi","名"],["重视","zhòngshì","动"],["综合","zōnghé","形、动"],["作用","zuòyòng","名"],["最终","zuìzhōng","副"]],"6":[["岸","àn","名"],["昂贵","ángguì","形"],["把握","bǎwò","动、名"],["保障","bǎozhàng","动、名"],["爆发","bàofā","动"],["背后","bèihòu","名"],["崩溃","bēngkuì","动"],["比例","bǐlì","名"],["边界","biānjìe","名"],["辩证","biànzhèng","形"],["冰山","bīngshān","名"],["勃然大怒","bórán-dànù",""],["不得已","bùdéyǐ","形、副"],["不可思议","bùkěsīyì","形"],["不时","bùshí","副"],["不由自主","bùyóuzìzhǔ",""],["朴素","pǔsù","形"],["承受","chéngshòu","动"],["充分","chōngfèn","形、副"],["充满","chōngmǎn","动"],["出口","chūkǒu","名、动"],["除此之外","chúcǐ zhīwài",""],["处于","chǔyú","动"],["传统","chuántǒng","名、形"],["创立","chuànglì","动"],["大量","dàliàng","形"],["代价","dàijià","名"],["担忧","dānyōu","动"],["当局","dāngjú","名"],["导致","dǎozhì","动"],["的确","díquè","副"],["地位","dìwèi","名"],["典型","diǎnxíng","形、名"],["定义","dìngyì","动、名"],["独立","dúlì","动、形"],["独特","dútè","形"],["对比","duìbǐ","动、名"],["而言","éryán",""],["发挥","fāhuī","动"],["反映","fǎnyìng","动"],["丰富","fēngfù","形、动"],["否定","fǒudìng","动、形"],["辐射","fúshè","动、名"],["赋予","fùyǔ","动"],["改善","gǎishàn","动"],["感激","gǎnjī","动"],["干预","gānyù","动"],["高效","gāoxiào","形"],["各种","gèzhǒng","代"],["共同","gòngtóng","形、副"],["观察","guānchá","动"],["惯例","guànlì","名"],["广泛","guǎngfàn","形"],["规范","guīfàn","动、名、形"],["归纳","guīnà","动"],["归因","guīyīn","动"],["含义","hányì","名"],["合作","hézuò","动"],["宏观","hóngguān","形"],["机构","jīgòu","名"],["基础","jīchǔ","名"],["基于","jīyú","介"],["几乎","jīhū","副"],["价值","jiàzhí","名"],["坚决","jiānjué","形"],["监督","jiāndū","动"],["建构","jiàngòu","动"],["交叉","jiāochā","动、形"],["教训","jiàoxun","名"],["局限","júxiàn","动、名"],["竞争","jìngzhēng","动、名"],["积累","jīlěi","动"],["可靠","kěkào","形"],["扩大","kuòdà","动"],["理论","lǐlùn","名"],["立场","lìchǎng","名"],["利益","lìyì","名"],["联合","liánhé","动、形"],["量化","liànghuà","动"],["逻辑","luójí","名"],["模糊","móhu","形"],["目的","mùdì","名"],["内在","nèizài","形"],["平等","píngděng","形"],["评估","pínggū","动、名"],["起源","qǐyuán","动、名"],["取得","qǔdé","动"],["确立","quèlì","动"],["人口","rénkǒu","名"],["认同","rèntóng","动"],["融合","rónghé","动"],["弱点","ruòdiǎn","名"],["三角","sānjiǎo","名"],["时期","shíqī","名"],["实施","shíshī","动"],["市场","shìchǎng","名"],["手段","shǒuduàn","名"],["输出","shūchū","动、名"],["属于","shǔyú","动"],["率","lǜ","名、量"],["双方","shuāngfāng","名"],["思路","sīlù","名"],["思维","sīwéi","名"],["探讨","tàntǎo","动"],["特征","tèzhēng","名"],["提供","tígōng","动"],["统一","tǒngyī","动、形"],["图书","túshū","名"],["维度","wéidù","名"],["文字","wénzì","名"],["稳定","wěndìng","形、动"],["系统","xìtǒng","名"],["现实","xiànshí","名、形"],["相关","xiāngguān","形"],["效益","xiàoyì","名"],["新型","xīnxíng","形"],["形象","xíngxiàng","名、形"],["压力","yālì","名"],["延伸","yánshēn","动"],["演变","yǎnbiàn","动"],["依据","yījù","名、介"],["引导","yǐndǎo","动"],["预测","yùcè","动、名"],["约束","yuēshù","动、名"],["运作","yùnzuò","动"],["在于","zàiyú","动"],["政治","zhèngzhì","名"],["整合","zhěnghé","动"],["制约","zhìyuē","动"],["周期","zhōuqī","名"],["主导","zhǔdǎo","动、名"],["主体","zhǔtǐ","名"],["资源","zīyuán","名"],["自觉","zìjué","形、副"],["作为","zuòwéi","动、介"]],"7":[["挨","ái","动"],["癌","ái","名"],["挨","āi","动、介"],["爱不释手","àibúshìshǒu",""],["爱戴","àidài","动"],["挨家挨户","āijiā-āihù",""],["暧昧","àimèi","形"],["爱慕","àimù","动"],["哀求","āiqiú","动"],["碍事","àishì","动、形"],["爱惜","àixī","动"],["癌症","áizhèng","名"],["艾滋病","àizībìng","名"],["暗地里","àndìlǐ","名"],["安定","āndìng","形、动"],["安抚","ānfǔ","动"],["案件","ànjiàn","名"],["按理","ànlǐ","副"],["安眠药","ānmiányào","名"],["安宁","ānníng","形"],["按钮","ànniǔ","名"],["按说","ànshuō","副"],["安稳","ānwěn","形"],["安详","ānxiáng","形"],["安心","ānxīn","形"],["安逸","ānyì","形"],["安置","ānzhì","动"],["暗中","ànzhōng","名"],["熬","áo","动"],["傲","ào","形"],["凹","āo","形"],["傲慢","àomàn","形"],["奥秘","àomì","名"],["拔","bá","动"],["坝","bà","名"],["扒","bā","动"],["疤","bā","名"],["把柄","bǎbǐng","名"],["巴不得","bābudé","动"],["八成","bāchéng","数量、副"],["霸道","bàdào","形"],["罢工","bàgōng","动"],["八卦","bāguà","名、形"],["把关","bǎguān","动"],["掰","bāi","动"],["百般","bǎibān","副、数量"],["摆动","bǎidòng","动"],["百分比","bǎifēnbǐ","名"],["百合","bǎihé","名"],["败坏","bàihuài","动、形"],["拜会","bàihuì","动"],["拜见","bàijiàn","动"],["百科全书","bǎikē quánshū",""],["摆平","bǎipíng","动"],["摆设","bǎishe","名"],["柏树","bǎishù","名"],["拜托","bàituō","动"],["巴结","bājie","动"],["罢了","bàle","助"],["芭蕾","bālěi","名"],["罢免","bàmiǎn","动"],["扮","bàn","动"],["伴","bàn","名、动"],["拌","bàn","动"],["绊","bàn","动"],["扳","bān","动"],["半边天","bànbiāntiān","名"],["颁布","bānbù","动"],["半岛","bàndǎo","名"],["半导体","bàndǎotǐ","名"],["斑点","bāndiǎn","名"],["颁发","bānfā","动"],["磅","bàng","量、名"],["绑","bǎng","动"],["绑架","bǎngjià","动"],["帮手","bāngshou","名"],["颁奖","bānjiǎng","动"],["绊脚石","bànjiǎoshí","名"],["半径","bànjìng","名"],["板块","bǎnkuài","名"],["伴侣","bànlǚ","名"],["斑马线","bānmǎxiàn","名"],["搬迁","bānqiān","动"],["版权","bǎnquán","名"],["办事处","bànshìchù","名"],["半数","bànshù","名"],["半途而废","bàntú'érfèi",""],["半信半疑","bànxìn-bànyí",""],["办学","bànxué","动"],["伴奏","bànzòu","动"],["报","bào","动"],["豹","bào","名"],["煲","bāo","名、动"],["剥","bāo","动"],["报案","bào'àn","动"],["包庇","bāobì","动"],["褒贬","bāobiǎn","动"],["报酬","bàochou","名"],["报仇","bàochóu","动"],["报答","bàodá","动"],["报废","bàofèi","动"],["暴风骤雨","bàofēng-zhòuyǔ",""],["报复","bàofù","动"],["抱负","bàofù","名"],["包袱","bāofu","名"],["曝光","bàoguāng","动"],["饱和","bǎohé","动"],["饱经沧桑","bǎojīng-cāngsāng",""],["宝库","bǎokù","名"],["堡垒","bǎolěi","名"],["暴利","bàolì","名"],["包罗万象","bāoluó-wànxiàng",""],["爆满","bàomǎn","动"],["饱满","bǎomǎn","形"],["保密","bǎomì","动"],["保姆","bǎomǔ","名"],["包容","bāoróng","动"],["宝石","bǎoshí","名"],["保守","bǎoshǒu","动、形"],["保卫","bǎowèi","动"],["包围","bāowéi","动"],["保鲜","bǎoxiān","动"],["报销","bàoxiāo","动"],["保养","bǎoyǎng","动"],["保佑","bǎoyòu","动"],["包扎","bāozā","动"],["宝藏","bǎozàng","名"],["暴躁","bàozào","形"],["保重","bǎozhòng","动"],["爆竹","bàozhú","名"],["把手","bǎshou","名"],["罢休","bàxiū","动"],["霸占","bàzhàn","动"],["巴掌","bāzhang","名"],["靶子","bǎzi","名"],["备","bèi","动、副"],["碑","bēi","名"],["悲哀","bēi'āi","形"],["卑鄙","bēibǐ","形"],["悲惨","bēicǎn","形"],["备份","bèifèn","名、动"],["背负","bēifù","动"],["被告","bèigào","名"],["悲欢离合","bēihuān-líhé",""],["背叛","bèipàn","动"],["倍增","bèizēng","动"],["贝壳","bèiké","名"],["背景","bèijǐng","名"],["奔波","bēnbō","动"],["奔跑","bēnpǎo","动"],["崩溃","bēngkuì","动"],["蹦","bèng","动"],["逼","bī","动"],["比较而言","bǐjiào éryán",""],["弊端","bìduān","名"],["毕生","bìshēng","名"],["弊病","bìbìng","名"],["鼻涕","bítì","名"],["比喻","bǐyù","动、名"],["毕竟","bìjìng","副"],["辩护","biànhù","动"],["变迁","biànqiān","动、名"],["变形","biàn xíng",""],["冰雹","bīngbáo","名"],["冰川","bīngchuān","名"],["秉公","bǐnggōng","副"],["病毒","bìngdú","名"],["并排","bìngpái","副"],["病患","bìnghuàn","名"],["博大精深","bódà-jīngshēn",""],["薄弱","bóruò","形"],["脖子","bózi","名"],["补偿","bǔcháng","动、名"],["布局","bùjú","动、名"],["步骤","bùzhòu","名"],["不知不觉","bùzhī-bùjué",""],["不折不扣","bùzhé-bùkòu","副"],["才干","cáigàn","名"],["财政","cáizhèng","名"],["参谋","cānmóu","动、名"],["残酷","cánkù","形"],["操控","cāokòng","动"],["侧重","cèzhòng","动"],["差距","chājù","名"],["差异","chāyì","名"],["阐述","chǎnshù","动"],["彻底","chèdǐ","形、副"],["沉默","chénmò","形、动"],["迟疑","chíyí","动"],["持之以恒","chízhī-yǐhéng",""],["冲突","chōngtū","动、名"],["抽象","chōuxiàng","形"],["出路","chūlù","名"],["出谋划策","chūmóu-huàcè",""],["出血","chū xiě",""],["处理","chǔlǐ","动"],["储存","chǔcún","动、名"],["储量","chǔliàng","名"],["传承","chuánchéng","动、名"],["创作","chuàngzuò","动、名"],["垂直","chuízhí","形"],["磁场","cíchǎng","名"],["从容","cóngróng","形"],["从属","cóngshǔ","动"],["粗糙","cūcāo","形"],["促成","cùchéng","动"],["摧毁","cuīhuǐ","动"],["措施","cuòshī","名"],["搭档","dādàng","名、动"],["打压","dǎyā","动"],["大幅度","dà fúdù",""],["大批","dàpī","形、名"],["大赦","dàshè","动"],["代沟","dàigōu","名"],["带领","dàilǐng","动"],["单纯","dānchún","形"],["单调","dāndiao","形"],["分担","fēndān","动"],["淡化","dànhuà","动"],["当初","dāngchū","名"],["当代","dāngdài","名"],["凝固","nínggù","动"],["倒退","dàotuì","动"],["道义","dàoyì","名"],["低调","dīdiào","形"],["低迷","dīmí","形"],["抵制","dǐzhì","动"],["点缀","diǎnzhuì","动"],["掉队","diào duì",""],["定期","dìngqī","形、副"],["动荡","dòngdàng","形"],["读书","dú shū",""],["端正","duānzhèng","形"],["对抗","duìkàng","动"],["对立","duìlì","动、形"],["对外","duìwài","形"],["多元","duōyuán","形"],["恶化","èhuà","动"],["恶势力","è shìlì",""],["发达","fādá","形"],["发动","fādòng","动"],["发誓","fā shì",""],["烦恼","fánnǎo","形、名"],["繁荣","fánróng","形、动"],["防范","fángfàn","动"],["防御","fángyù","动"],["废除","fèichú","动"],["分辨","fēnbiàn","动"],["分化","fēnhuà","动"],["丰盛","fēngshèng","形"],["否认","fǒurèn","动"],["腐败","fǔbài","形、动"],["弘扬","hóngyáng","动"],["辅助","fǔzhù","动、形"],["复苏","fùsū","动"],["复习","fùxí","动"],["赶超","gǎnchāo","动"],["刚性","gāngxìng","形"],["高效率","gāo xiàolǜ",""],["巩固","gǒnggù","动、形"],["共存","gòngcún","动"],["挂","guà","动"],["关键","guānjiàn","名、形"],["管控","guǎnkòng","动"],["贯彻","guànchè","动"],["光荣","guāngróng","形"],["归属","guīshǔ","动"],["过渡","guòdù","动"],["核实","héshí","动"],["划分","huāfēn","动"],["活力","huólì","名"],["基调","jīdiào","名"],["激活","jīhuó","动"],["即可","jí kě",""],["记载","jìzǎi","动、名"],["技巧","jìqiǎo","名"],["迹象","jìxiàng","名"],["精彩","jīngcǎi","形"],["精华","jīnghuá","名"],["精确","jīngquè","形"],["精神","jīngshén","名、形"],["警示","jǐngshì","动、名"],["拒绝","jùjué","动"],["开拓","kāituò","动"],["开放","kāifàng","动、形"],["客观","kèguan","形"],["控制","kòngzhì","动"],["夸大","kuādà","动"],["扩张","kuòzhāng","动"],["来源","láiyuán","名、动"],["冷静","lěngjìng","形"],["历程","lìchéng","名"],["力求","lìqiú","动"],["连续","liánxù","形"],["劣势","lièshì","名"],["落实","luòshí","动"],["矛盾","máodùn","名、形"],["矛盾体","máodùntǐ","名"],["每当","měidāng","连"],["门槛","ménkǎn","名"],["名誉","míngyù","名"],["模仿","mófǎng","动"],["谋取","móuqǔ","动"],["内部","nèibù","名"],["凝聚","níngjù","动"],["排斥","páichì","动"],["陪伴","péibàn","动"],["彭胀","péngzhàng","动"],["偏见","piānjian","名"],["偏向","piānxiàng","动"],["拼搏","pīnbó","动"],["迫使","pòshǐ","动"],["破坏","pòhuài","动"],["期限","qīxiàn","名"],["迁移","qiānyí","动"],["清晰","qīngxī","形"],["驱动","qūdòng","动"],["取消","qǔxiāo","动"],["全局","quánjú","名"],["确实","quèshí","副、形"],["缺乏","quēfá","动"],["缺陷","quēxiàn","名"],["热忱","rèchén","名"],["认知","rènzhī","动、名"],["任职","rèn zhí",""],["融资","róngzī","动"],["散布","sànbù","动"],["深化","shēnhuà","动"],["渗透","shèntòu","动"],["胜任","shèngrèn","动"],["失去","shīqù","动"],["时间表","shíjiānbiǎo","名"],["实质","shízhì","名"],["势力","shìlì","名"],["适应","shìyìng","动"],["收益","shōuyì","名"],["受限","shòu xiàn",""],["束缚","shùfù","动、名"],["顺应","shùnyìng","动"],["倡议","chàngyì","动、名"],["随意","suíyì","形、副"],["损害","sǔnhài","动"],["探索","tànsuo","动"],["态势","tàishì","名"],["体制","tǐzhì","名"],["添加","tiānjiā","动"],["调整","tiáozhěng","动、名"],["统筹","tǒngchóu","动"],["突破","tūpò","动、名"],["退出","tuìchū","动"],["外部","wàibù","名"],["完整","wánzhěng","形"],["威胁","wēixié","动、名"],["委托","wěituō","动"],["维权","wéi quán",""],["相互促进","xiānghù cùjìn",""],["消除","xiāochú","动"],["效率","xiàolǜ","名"],["有所不同","yǒusuǒbùtóng",""],["优化","yōuhuà","动"],["优势","yōushì","名"],["遭遇","zāoyù","动、名"],["增强","zēngqiáng","动"],["占据","zhànjù","动"],["占有","zhànyǒu","动"],["针对","zhēnduì","动、介"],["正当","zhèngdàng","形"],["支撑","zhīchēng","动"],["职能","zhínéng","名"],["秩序","zhìxù","名"],["治理","zhìlǐ","动"],["制造","zhìzào","动"],["智慧","zhìhuì","名"],["中介","zhōngjiè","名"],["逐步","zhúbù","副"],["主观","zhǔguān","形"],["主权","zhǔquán","名"],["阻力","zǔlì","名"],["组织","zǔzhī","动、名"],["尊严","zūnyán","名"],["作出","zuòchū","动"]]};

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