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
        media2 = Media(category="portfolio", url="https://www.dropbox.com/scl/fi/yvllcas7jpvjm9qoz5yyt/8.jpeg?rlkey=v9cuh630chcl6gpr2nhk2n82h&dl=1")
        media3 = Media(category="portfolio", url="https://media.discordapp.net/attachments/1205180495118471229/1226199527418105967/Screenshot_2024-04-06_at_11.54.37_AM.jpg?ex=6623e64d&is=6611714d&hm=354954d3ec14b2a9593a36b280d7ce954e96f1f0a482565a792600f57137f4bc&=&format=webp&width=2160&height=964")
        media4 = Media(category="video", url = "https://www.instagram.com/p/C5iuG9tL7uy/")
        media5 = Media(category="lifestyle", url ="https://www.dropbox.com/scl/fi/yojrhscbvadjky4ars19f/23154942_10214516746420923_6277462779965315800_o.jpg?rlkey=u38s98r5pswclcesusrflh0xi&dl=1")
        media6 = Media(category="lifestyle", url= "https://www.dropbox.com/scl/fi/profkg4v841kmxbd61ln9/26229699_10215040249748179_2986383517301310309_n.jpg?rlkey=5vu3t6try54vshf7uu0iccjzq&dl=1")
        media7 = Media(category="lifestyle", url = "https://www.dropbox.com/scl/fi/2nla1vklk0n2gvycnyno7/17353518_10212405746007232_8342684362953028143_n.jpg?rlkey=vdfiydlb9bpw0giual36ljxb1&dl=1")
        media8 = Media(category = "portfolio", url = "https://www.dropbox.com/scl/fi/zflv1xku5mudzdgxxagem/10461309_10206395648998563_4987774585462770713_n.jpg?rlkey=ra69z6ygw8n4jqb2x2gupwmcs&dl=1")
        media9 = Media(category="portfolio", url="https://www.instagram.com/p/CIQA8n1MH6I/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==")
        media10 = Media(category= "portfolio", url= "https://www.dropbox.com/scl/fi/pjq55icizo2bj01q3u76j/Photo-Apr-15-2024-9-11-32-PM-2.jpg?rlkey=bz9pmfi3zwrmpczfgg3nkrtpc&dl=1")
        media11 = Media(category= "portfolio", url= "https://www.dropbox.com/scl/fi/3k79ufswbeyquap9jlcd1/Photo-Apr-15-2024-9-11-32-PM-1.jpg?rlkey=gelbq3dkt6ct1w8zi3tb8prp5&dl=1")
        media12 = Media(category="portfolio", url= "https://www.dropbox.com/scl/fi/s74j7h7001elyggfbimcz/Photo-Apr-15-2024-9-11-32-PM.jpg?rlkey=goisvpe63y7kxvd67eml12bag&dl=1")





    # Add sample comments on media posts
        # comment4 = Comment(content="Comment on media post 1", user=user1, media=media1)
        # comment5 = Comment(content="Comment on media post 2", user=user2, media=media2)
        # comment6 = Comment(content="Comment on media post 3", user=user3, media=media3)

    # Add objects to session and commit to database
        db.session.add_all([user1, user2, user3, fan_mail1, fan_mail2, fan_mail3,
                            media1, media2, media3, media4, media5, media6, media7,
                            media8, media9, media10, media11, media12,
                            ])
        db.session.commit()

if __name__ == "__main__":
    seed_database()
    print("Database seeded successfully.")