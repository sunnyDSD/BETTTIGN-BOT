

from apscheduler.schedulers.blocking import BlockingScheduler
from backend.data_manager import summarize_and_delete_old_data

def scheduled_cleanup():
    summarize_and_delete_old_data(days_to_keep=1)  # Adjust days as needed

if __name__ == "__main__":
    scheduler = BlockingScheduler()
    scheduler.add_job(scheduled_cleanup, 'cron', hour=0)  # Runs daily at midnight
    print("Starting data cleanup scheduler...")
    scheduler.start()
