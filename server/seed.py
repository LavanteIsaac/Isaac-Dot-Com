from config import db, app
from models import User, FanMail, Media, Comment

def seed_database():
    with app.app_context():
        User.query.delete()
        Media.query.delete()
        FanMail.query.delete()

        user1 = User(username='IsaacFan1', password_hash='password1')
        user2 = User(username='HateIsaac2', password_hash='password2')
        user3 = User(username='Fan3', password_hash='password3')

    # Add sample fan mails
        fan_mail1 = FanMail(content="Love Isaac", user=user1)
        fan_mail2 = FanMail(content="Hate Isaac", user=user2)
        fan_mail3 = FanMail(content="I hate and love isaac", user=user3)

    # Add sample media posts
        media1 = Media(category="portfolio", url="https://media.discordapp.net/attachments/1205180495118471229/1226205067451961444/417482_4368793066504_1861712029_n.jpg?ex=6623eb75&is=66117675&hm=a2fef69ed36acd72c683c25a4ea39a1740eba876c74fae140352fcc45ea510ad&=&format=webp&width=930&height=930")
        
        media3 = Media(category="portfolio", url="https://www.dropbox.com/scl/fi/dzycry7doaef6q444x23v/237167964_10225839034791056_2103355489169096817_n.jpg?rlkey=akqzqlfvcj9wis0i78zqsp5tc&dl=1")
        media4 = Media(category="video", url = "https://www.dropbox.com/scl/fi/6hnf93ifrfu6x4i1hgrps/Video-Apr-09-2024-9-31-47-AM.mov?rlkey=o0f17gjxnt4unkp9gp6deg0zf&dl=1")
        media5 = Media(category="lifestyle", url ="https://www.dropbox.com/scl/fi/yojrhscbvadjky4ars19f/23154942_10214516746420923_6277462779965315800_o.jpg?rlkey=u38s98r5pswclcesusrflh0xi&dl=1")
        media6 = Media(category="lifestyle", url= "https://www.dropbox.com/scl/fi/profkg4v841kmxbd61ln9/26229699_10215040249748179_2986383517301310309_n.jpg?rlkey=5vu3t6try54vshf7uu0iccjzq&dl=1")
        media7 = Media(category="lifestyle", url = "https://www.dropbox.com/scl/fi/2nla1vklk0n2gvycnyno7/17353518_10212405746007232_8342684362953028143_n.jpg?rlkey=vdfiydlb9bpw0giual36ljxb1&dl=1")
        media8 = Media(category = "portfolio", url = "https://www.dropbox.com/scl/fi/zflv1xku5mudzdgxxagem/10461309_10206395648998563_4987774585462770713_n.jpg?rlkey=ra69z6ygw8n4jqb2x2gupwmcs&dl=1")
        media2 = Media(category="portfolio", url="https://www.dropbox.com/scl/fi/yvllcas7jpvjm9qoz5yyt/8.jpeg?rlkey=v9cuh630chcl6gpr2nhk2n82h&dl=1")
        media9 = Media(category="portfolio", url="https://www.dropbox.com/scl/fi/icctyfe3fzchyuaa6sfvi/10407720_799541846788116_7080057823276188388_n.jpg?rlkey=e8qlbwl88646nml4u8w1z80jq&dl=1")
        media10 = Media(category= "portfolio", url= "https://www.dropbox.com/scl/fi/pjq55icizo2bj01q3u76j/Photo-Apr-15-2024-9-11-32-PM-2.jpg?rlkey=bz9pmfi3zwrmpczfgg3nkrtpc&dl=1")
        media11 = Media(category= "portfolio", url= "https://www.dropbox.com/scl/fi/3k79ufswbeyquap9jlcd1/Photo-Apr-15-2024-9-11-32-PM-1.jpg?rlkey=gelbq3dkt6ct1w8zi3tb8prp5&dl=1")
        media12 = Media(category="portfolio", url= "https://www.dropbox.com/scl/fi/s74j7h7001elyggfbimcz/Photo-Apr-15-2024-9-11-32-PM.jpg?rlkey=goisvpe63y7kxvd67eml12bag&dl=1")
        media13= Media(category="lifestyle", url= "https://www.dropbox.com/scl/fi/5k0mkzd90azm39trblr8r/300074380_10227795809829209_4579401885232355476_n.jpg?rlkey=i44zcdvnk8d6zmfcw2jsozbmh&dl=1")
        media14= Media(category="portfolio", url= "https://www.dropbox.com/scl/fi/9w02603dnmig8umxzpsvm/9.jpeg?rlkey=x4vv3t3vwse2fggj0nqle6adi&dl=1")
        media15= Media(category="portfolio", url= "https://www.dropbox.com/scl/fi/iiaohrq6c62rsa1zdp0av/9.1.jpg?rlkey=efx7rxo4r3j9zrtons5r67spe&dl=1")
        media16 = Media(category="lifestyle", url= "https://www.dropbox.com/scl/fi/g8z5mu8qcp8b74l7gw86d/13872935_10210190015215347_6538866174638320098_n-1.jpg?rlkey=85gpmejsv3mxho8yjseaiuhzu&dl=1")
        media17 = Media(category="portfolio", url="https://www.dropbox.com/s/hs7mkmqk0bnvutl/000000.jpg?dl=1")
        media18 = Media(category="video", url="https://www.dropbox.com/scl/fi/3fnmkydfhpiqyq4iqe9yk/Video-Apr-16-2024-12-10-09-PM.mov?rlkey=rmnp4dgduw0hru5h8g9hz7qvf&dl=1")
        media19 =  Media(category="video", url="https://www.dropbox.com/scl/fi/9eai3o51csjcjsk78ya1h/Video-Apr-16-2024-12-12-57-PM.mov?rlkey=xcgyxpadkynftjpoqqq4ok2mc&dl=1")
        media20 = Media(category="video", url="https://www.dropbox.com/scl/fi/9ru5m1rsh9ke708iskkp9/Video-Apr-16-2024-12-13-09-PM.mov?rlkey=ikcr9rwqs4e2cnkmjds0fjtn1&dl=1")
        media21 = Media(category="video", url="https://www.dropbox.com/scl/fi/i12hbpfro1o9bt7sv9763/Video-Apr-16-2024-12-13-15-PM.mov?rlkey=b89rrxy7oxmxg48rdw6bjv7wr&dl=1")
        media22 =Media(category="portfolio", url="https://www.dropbox.com/scl/fi/nsy5jr55zd6bac4yodozo/00001.jpg?rlkey=nrl8o60q04i86vpref41fcjvo&dl=1")
        media23 =Media(category="portfolio", url="https://www.dropbox.com/scl/fi/yxriucf2tmsnmfmg71eex/image0.jpeg?rlkey=2emvsagd1q10ea2xps7esu4ye&dl=1")
        media24 =Media(category="portfolio", url="https://www.dropbox.com/scl/fi/c4fglmvncfew1k7afb9qa/Photo-Apr-16-2024-12-24-07-PM.jpg?rlkey=g9ybq19t5r2d7pkbd8d4q6dpb&dl=1")
        media25 =Media(category="portfolio", url="https://www.dropbox.com/scl/fi/05egcicf1atp1lpjzoboy/Isaac4.jpg?rlkey=15168gveho2vqwhb04crpip73&dl=1")
        media26 =Media(category="portfolio", url="https://www.dropbox.com/scl/fi/vp0m8ctcbhzk2w66clcdw/Isaac2.jpg?rlkey=pc8au7e5ffmsgrd2zkgzokcut&dl=1")
        media27 =Media(category="portfolio", url="https://www.dropbox.com/scl/fi/aialob0giutfl34ywfnhp/Isaac-1.jpg?rlkey=j079o7knyplhyzgs9vjv7i3w3&dl=1")
        media28 =Media(category="portfolio", url="https://www.dropbox.com/scl/fi/2boyt0zus13k9p2pwry9y/IMG03169-1.jpg?rlkey=nu2q3r6kcuyvhr9mnmaxeh3lh&dl=1")
        media29 =Media(category="portfolio", url="https://www.dropbox.com/scl/fi/g7zis3v1hf33viw0oaf8f/Lavante3.jpg?rlkey=6d08he23yamnlwqhxizlismpj&dl=1")
        media30 =Media(category="portfolio", url="https://www.dropbox.com/scl/fi/0lgri5i5ow5lfynzz0gjp/Lavante2.jpg?rlkey=34rygngb4zg87cgedop5b33w6&dl=1")
        media31 =Media(category="portfolio", url="https://www.dropbox.com/scl/fi/bgog0iw2cxjio0r9i0ju6/Photo-Feb-13-8-01-41-AM.jpg?rlkey=rvr82ikfq1njkfmdy525euuaa&dl=1")
        media32 =Media(category="portfolio", url="https://www.dropbox.com/scl/fi/kvr668zevvlto7ahkynsw/Photo-Feb-12-7-45-24-PM.jpg?rlkey=bappuk1in7evgxh3fozatneh9&dl=1")
        media33 =Media(category="portfolio", url="https://www.dropbox.com/scl/fi/tu9pgx1ur9ksbc2xowo9d/342885136_2218655444973117_9125636597873904132_n.jpg?rlkey=52h9b4r6xqf86ngffx8h4aech&dl=1")
        media34 =Media(category="portfolio", url="https://www.dropbox.com/scl/fi/1q990g1lqz78x4goxu4ob/342877959_1257806391762955_5571869929382994496_n.jpg?rlkey=n9rvjkebw8wf9m21u9zh8ircp&dl=1")
        media35 =Media(category="portfolio", url="https://www.dropbox.com/scl/fi/5q021p5e4u8x68nd2b9c8/342863127_618046099876342_4375435229163856007_n.jpg?rlkey=xxw5ydvz4y1pardj37n9jfno7&dl=1")
        media36 =Media(category="lifestyle", url="https://www.dropbox.com/scl/fi/6hd9fghepb8h7cinkr1fy/Photo-Apr-16-2024-12-56-47-PM-1.jpg?rlkey=2hfwbhm8obfilrmcf96nh9pxt&dl=1")
        media37 =Media(category="lifestyle", url="https://www.dropbox.com/scl/fi/905maw6gcg1kr18iyhs6v/Photo-Apr-16-2024-12-56-47-PM-2.jpg?rlkey=xsdk2yqxvfjtzvk6gloai25pd&dl=1")
        media38 =Media(category="lifestyle", url="https://www.dropbox.com/scl/fi/00v1vp4312tdxg5zmfd37/Photo-Apr-16-2024-12-56-47-PM-3.jpg?rlkey=hbo7fra4ocuetducndh2u4zxn&dl=1")
        media39 =Media(category="lifestyle", url="https://www.dropbox.com/scl/fi/f089yfkexlvrtbi7afbti/Photo-Apr-16-2024-12-56-47-PM.jpg?rlkey=p9a0zh5oqg67lgj6ji3hmu3to&dl=1")
        media40 =Media(category="lifestyle", url="https://www.dropbox.com/scl/fi/su197o6eacm7fvnt77z8i/Photo-Jul-11-2023-12-55-29-PM.jpg?rlkey=0sj5teex0lrrzi2a5jm7pi0id&dl=1")
        media41 =Media(category="lifestyle", url="https://www.dropbox.com/scl/fi/za36j7okspme5bb0e5ftt/Photo-Jul-18-2023-11-23-45-AM.jpg?rlkey=ss2fagf3ul3s3ghqxktze5ez8&dl=1")
        media42 =Media(category="lifestyle", url="https://www.dropbox.com/scl/fi/okl0x55eixqdwlp2667z6/Photo-Jul-25-2022-10-15-34-AM.jpg?rlkey=mdco7tzt71pzfhoixzulyibzn&dl=1")
        media43 =Media(category="lifestyle", url="https://www.dropbox.com/scl/fi/0ek2jezofuuu1d7nkyxz9/Photo-May-12-2022-1-07-58-PM.jpg?rlkey=ue5zt0dux3gyff39pmv7nxi66&dl=1")
        media44 =Media(category="lifestyle", url="https://www.dropbox.com/scl/fi/4y6s5nxv8d6fhdoqb6iy6/Photo-May-29-2023-6-00-52-PM.jpg?rlkey=bhrk7xmbf68r1omv64zmpw944&dl=1")
        media45 =Media(category="lifestyle", url="https://www.dropbox.com/scl/fi/tva36g1hx4bpljknsdorf/Photo-Sep-04-2023-8-19-24-PM.jpg?rlkey=dtwwy7abor7x2zga1e8qxkaae&dl=1")
       






    # Add sample comments on media posts
        # comment4 = Comment(content="Comment on media post 1", user=user1, media=media1)
        # comment5 = Comment(content="Comment on media post 2", user=user2, media=media2)
        # comment6 = Comment(content="Comment on media post 3", user=user3, media=media3)

    # Add objects to session and commit to database
        db.session.add_all([user1, user2, user3, fan_mail1, fan_mail2, fan_mail3,
                            media1, media3, media4, media5, media6, media7,
                            media8, media2, media9, media10, media11, media12, media13, media14,
                            media15, media16, media17, media18, media19, media20, media21,
                            media22, media23, media24, media25, media26, media27, media28,
                            media29, media30, media31, media32, media33, media34, media35,
                            media36, media37, media38, media39, media40, media41, media42,
                            media43, media44, media45, 

                            ])
        db.session.commit()

if __name__ == "__main__":
    seed_database()
    print("Database seeded successfully.")