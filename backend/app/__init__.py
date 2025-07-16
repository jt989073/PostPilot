from flask import Flask, jsonify
from flask_cors import CORS   # ← add this
from app.celery_app import celery
from .routes.auth import auth
from .routes.posts import posts
from .routes.oauth import oauth
from .routes.analytics import analytics
from .routes.health import health_bp

def create_app():
    app = Flask(__name__)

    # Allow cross‑origin requests (for development)
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


    # Health check
    @app.route('/api/health')
    def health_check():
        return jsonify(status="healthy", service="social-media-dashboard")

    # Register your blueprints
    app.register_blueprint(auth, url_prefix="/api/auth")
    app.register_blueprint(posts, url_prefix="/api")
    app.register_blueprint(oauth, url_prefix="/api")
    app.register_blueprint(analytics, url_prefix="/api")
    app.register_blueprint(health_bp, url_prefix='/api')

    return app
