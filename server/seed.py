from config import db, app
from models import User, FanMail, Media, Comment

def seed_database():
    with app.app_context():

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
        media4 = Media(category="video", url = "https://www.dropbox.com/scl/fi/6hnf93ifrfu6x4i1hgrps/Video-Apr-09-2024-9-31-47-AM.mov?rlkey=o0f17gjxnt4unkp9gp6deg0zf&dl=1")
        media5 = Media(category="lifestyle", url ="https://www.dropbox.com/scl/fi/yojrhscbvadjky4ars19f/23154942_10214516746420923_6277462779965315800_o.jpg?rlkey=u38s98r5pswclcesusrflh0xi&dl=1")
        media6 = Media(category="lifestyle", url= "https://www.dropbox.com/scl/fi/profkg4v841kmxbd61ln9/26229699_10215040249748179_2986383517301310309_n.jpg?rlkey=5vu3t6try54vshf7uu0iccjzq&dl=1")
        media7 = Media(category="lifestyle", url = "https://www.dropbox.com/scl/fi/2nla1vklk0n2gvycnyno7/17353518_10212405746007232_8342684362953028143_n.jpg?rlkey=vdfiydlb9bpw0giual36ljxb1&dl=1")
    # Add sample comments on media posts
        # comment4 = Comment(content="Comment on media post 1", user=user1, media=media1)
        # comment5 = Comment(content="Comment on media post 2", user=user2, media=media2)
        # comment6 = Comment(content="Comment on media post 3", user=user3, media=media3)

    # Add objects to session and commit to database
        db.session.add_all([user1, user2, user3, fan_mail1, fan_mail2, fan_mail3,
                            media1, media2, media3, media4, media5, media6, media7,

                            ])
        db.session.commit()

if __name__ == "__main__":
    seed_database()
    print("Database seeded successfully.")