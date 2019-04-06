FROM maven:3-alpine as builder

RUN mkdir -p /build/
WORKDIR /build/

COPY . /build/

# Installs maven
RUN mvn package -DskipTests=true && \
    cd target/ && \
    mv $(ls | grep dependencies.jar) rtt.jar

FROM openjdk:11-jre-slim

LABEL maintainer="Davide Polonio <poloniodavide@gmail.com>"
LABEL license="GPL3"
LABEL description="Reddit to Telegram docker image"

RUN mkdir -p /config/
WORKDIR /srv/

COPY --from=builder /build/target/rtt.jar /srv/

ENTRYPOINT ["java", "-jar", "rtt.jar"]