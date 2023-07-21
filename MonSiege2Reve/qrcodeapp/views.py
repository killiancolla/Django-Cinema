import json
import os
import qrcode
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def generate_qr_code(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            purchase_id = data.get('purchase_id', '')
            session_name = data.get('session_name', '')
            room_name = data.get('room_name', '')
            ticket_type = data.get('ticket_type', '')
            timestamp = data.get('timestamp', '')

            qr_code_data = f"Session: {session_name}\nRoom: {room_name}\nTicket: {ticket_type}\nTimestamp: {timestamp}"

            qr_code_image = generate_qr_code_image(qr_code_data, purchase_id)

            # Enregistre le QR Code avec l'ID de l'achat comme nom
            if os.path.exists("../client/public/media") :
                os.makedirs("../client/public/media")

            qr_code_filename = f"{purchase_id}.png"
            qr_code_image.save(os.path.join("../client/public/media/" + qr_code_filename))

            qr_code_url = f"/media/qr_codes/{qr_code_filename}"

            return JsonResponse({'success': True, 'qr_code_filename': qr_code_url})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data.'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=405)

def generate_qr_code_image(data, purchase_id):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    return img
