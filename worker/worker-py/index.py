from storage3 import create_client
# import os
# from dotenv import load_dotenv
# load_dotenv()


def handleRequest(request):

    # url = os.getenv("SUPABASE_URL")
    # service_key = os.getenv("SUPABASE_KEY")
    url = env.SUPABASE_URL
    service_key = env.SUPABASE_KEY
    # service key !!!! apiKey inutile dans les headers
    headers = {"Authorization": f"Bearer {service_key}"}

    storage_client = storage3.create_client(url, headers, is_async=False)
    print(storage_client.list_buckets())

    return __new__(Response('Python Worker hello world!', {
        'headers': {'content-type': 'text/plain'}
    }))


addEventListener(
    'fetch', (lambda event: event.respondWith(handleRequest(event.request))))
