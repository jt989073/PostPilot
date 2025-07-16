from celery import Celery

def make_celery():
    celery = Celery(
        'app',
        broker='redis://redis:6379/0',
        backend='redis://redis:6379/0'
    )
    celery.conf.update(
        task_serializer='json',
        result_serializer='json',
        accept_content=['json'],
    )
    return celery

celery = make_celery()
