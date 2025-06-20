# To learn how to customize your Dockerfile, see https://aka.ms/vscode-docker-dotnet-customize

# Base image for runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# SDK image for build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["GenderHealthSystem.csproj", "."]
RUN dotnet restore "./GenderHealthSystem.csproj"
COPY . .
RUN dotnet build "./GenderHealthSystem.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Publish stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./GenderHealthSystem.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Final stage
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "GenderHealthSystem.dll"]