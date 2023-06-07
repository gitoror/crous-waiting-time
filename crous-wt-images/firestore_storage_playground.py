import firebase_admin

# Create client
cred = firebase_admin.credentials.Certificate(
    'KEY.json')
firebase_admin.initialize_app(cred, {
    'storageBucket': 'crous-wt.appspot.com'
})

# Retrieve bucket
bucket = firebase_admin.storage.bucket("crous-wt")

# Upload a file
blob = bucket.blob("8.jpg")
blob.metadata = {"processed": "false"}
blob.content_type = 'image/jpeg'
blob.upload_from_filename("images/8.jpg")
