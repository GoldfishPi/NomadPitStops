echo 'Creating application user and db'

mongo app_db \
        --host localhost \
        --port 27017 \
        -u root_username \
        -p very_secure_root_pass \
        --authenticationDatabase admin \
        --eval "db.createUser({user: 'erikarch', pwd: 'digitalnomad01', roles:[{role:'dbOwner', db: 'app'}]});"
