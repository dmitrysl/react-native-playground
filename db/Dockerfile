# Runtime image
FROM mongo:3.3.11
COPY * /src/
CMD mongo admin < /src/initial-db-admin.js
CMD mongo admin -u system -p admin123 < /src/initial-db-setup.js