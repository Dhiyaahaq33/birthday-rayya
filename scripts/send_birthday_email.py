import os
import smtplib
import sys
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def send_email(recipient_email=None, custom_subject=None):
    sender_email = os.environ.get("SENDER_EMAIL")
    sender_password = os.environ.get("GMAIL_APP_PASSWORD")
    
    if not recipient_email:
        recipient_email = os.environ.get("RAYYA_EMAIL")
        
    if not sender_email or not sender_password:
        print("ERROR: SENDER_EMAIL atau GMAIL_APP_PASSWORD belum diatur di environment variable/Secrets!")
        sys.exit(1)
        
    if not recipient_email:
        print("ERROR: Alamat email penerima (RAYYA_EMAIL) belum diisi!")
        sys.exit(1)

    subject = custom_subject or "🎂 Ada Kejutan Kecil di Hari Ulang Tahunmu, Rayya... Coba Buka Ini!"
    
    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = f"Muhammad Yahya DH. <{sender_email}>"
    msg["To"] = recipient_email

    text_content = """Hai Houris... ✨

Selamat ulang tahun ya!

Khusus di hari spesialmu ini, aku sengaja buatin satu website kecil sederhana buat nemenin hari ulang tahunmu. Di dalamnya ada kumpulan doa, musik penenang suasana, dan sedikit pesan kecil buat kamu.

Coba buka di sini ya:
👉 https://dhiyaahaq33.github.io/birthday-rayya/

(Psst... ada pintu rahasia berikon rumah di kanan atas dengan PIN: 130806 yang menunggu untuk kamu buka!)

Semoga kamu suka ya sama kejutan kecil ini. Sekali lagi selamat bertambah usia, Rayya. Semoga harimu menyenangkan! 🎂✨

Dari:
Muhammad Yahya DH.
"""

    html_content = """<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #FFF9FB; margin: 0; padding: 20px; color: #2B2D42; }
  .card { max-width: 560px; margin: 20px auto; background: #ffffff; border-radius: 20px; padding: 36px 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.06); border: 1px solid #FFD6E7; }
  .badge { display: inline-block; background: #FFE8F0; color: #FF8FAB; font-size: 13px; font-weight: 600; padding: 6px 14px; border-radius: 50px; margin-bottom: 16px; }
  h1 { color: #FF8FAB; font-size: 24px; margin-top: 0; margin-bottom: 16px; }
  p { line-height: 1.8; font-size: 15px; color: #555555; }
  .btn { display: inline-block; background: linear-gradient(135deg, #FF8FAB 0%, #FF6B8B 100%); color: #ffffff !important; text-decoration: none; padding: 14px 28px; border-radius: 50px; font-weight: bold; font-size: 15px; margin: 24px 0 16px; box-shadow: 0 4px 15px rgba(255,143,171,0.4); }
  .pin-box { background: #FFF0F5; border-left: 4px solid #FF8FAB; padding: 12px 18px; border-radius: 8px; margin: 20px 0; font-size: 14px; color: #444; }
  .footer { margin-top: 30px; border-top: 1px solid #F0F0F0; padding-top: 20px; font-size: 13px; color: #888888; text-align: center; }
</style>
</head>
<body>
  <div class="card">
    <div class="badge">✨ Special Birthday Surprise</div>
    <h1>Happy Birthday, Rayya! 🎂</h1>
    <p>Hai <strong>Houris</strong>... ✨</p>
    <p>Selamat bertambah usia ya!</p>
    <p>Khusus di hari spesialmu ini, aku sengaja buatin satu website kecil sederhana buat nemenin hari ulang tahunmu. Di dalamnya ada kumpulan doa, musik penenang suasana, dan sedikit cerita kecil buat kamu.</p>
    
    <div style="text-align: center;">
      <a href="https://dhiyaahaq33.github.io/birthday-rayya/" class="btn">✨ Buka Kejutan Ulang Tahunmu</a>
    </div>

    <div class="pin-box">
      <strong>🔑 Kode Rahasia:</strong> Di website ada pintu rahasia berikon rumah di kanan atas dengan PIN: <code style="background:#FFF; padding:2px 6px; border-radius:4px; font-size:15px; font-weight:bold; color:#FF8FAB;">130806</code>
    </div>

    <p>Semoga kamu suka ya sama kejutan kecil ini. Sekali lagi selamat bertambah usia, Rayya. Semoga harimu selalu dipenuhi senyuman!</p>
    
    <p style="margin-top: 24px;">
      Dari yang selalu mengagumi & mendoakanmu,<br>
      <strong>Muhammad Yahya DH. ✨</strong>
    </p>

    <div class="footer">
      Dibuat khusus untuk Rayya Childora W. • 17 Agustus
    </div>
  </div>
</body>
</html>
"""

    msg.attach(MIMEText(text_content, "plain"))
    msg.attach(MIMEText(html_content, "html"))

    print(f"Menghubungkan ke SMTP Gmail...")
    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, recipient_email, msg.as_string())
        
    print(f"SUCCESS: Email berhasil dikirim ke {recipient_email}!")

if __name__ == "__main__":
    recipient = sys.argv[1] if len(sys.argv) > 1 and sys.argv[1] else None
    subj = sys.argv[2] if len(sys.argv) > 2 and sys.argv[2] else None
    send_email(recipient, subj)
