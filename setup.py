from setuptools import setup, find_packages


version = __import__('mqueue_livefeed').__version__

setup(
    name = 'django-mqueue-livefeed',
    packages=find_packages(),
    include_package_data=True,
    version = version,
    description = ' Real time events feed for Django Mqueue',
    author = 'synw',
    author_email = 'synwe@yahoo.com',
    url = 'https://github.com/synw/django-mqueue-livefeed', 
    download_url = 'https://github.com/synw/django-mqueue-livefeed/releases/tag/'+version, 
    keywords = ['django', 'websockets', 'events', 'livefeed'], 
    classifiers = [
          'Development Status :: 3 - Alpha',
          'Framework :: Django :: 1.9',
          'Intended Audience :: Developers',
          'License :: OSI Approved :: MIT License',
          'Programming Language :: Python :: 2.7',
      ],
    install_requires=[
        "django-mqueue",
        'django-instant',
    ],
    zip_safe=False
)
