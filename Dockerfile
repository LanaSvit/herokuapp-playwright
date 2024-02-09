FROM mcr.microsoft.com/playwright

COPY . /tests-playwright
RUN cd tests-playwright

RUN npx -y playwright@1.41.1 install --with-deps

CMD ["npx", "playwright", "test"]