from flask import Blueprint, redirect, request

oauth = Blueprint('oauth', __name__)

@oauth.route('/oauth/callback')
def oauth_callback():
    # Simulate handling a callback from an OAuth provider
    code = request.args.get('code')
    return f"Received code: {code}", 200
