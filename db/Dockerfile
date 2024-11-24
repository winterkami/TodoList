FROM mysql:8.0

EXPOSE 3306
# Copy init.sql into the container's initialization directory
COPY init.sql /docker-entrypoint-initdb.d/
