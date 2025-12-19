const obje = {
    topic: "Guards",
    tags: ["Authorization", "Authentication", "Security", "ExecutionContext", "Middleware", "RBAC", "Pipes", "Interceptors"],
    explanation: `
    <div><p style="line-height: 1.75; margin-top: 1.5rem;"> Guards are a crucial security layer in NestJS that determine whether a request should be processed or rejected. They implement authorization logic and access control, executing after middleware but before pipes and interceptors in the request lifecycle. Guards have access to the ExecutionContext, which provides detailed information about the current request, allowing them to make intelligent decisions about whether to allow or deny access. Think of guards as security checkpoints that validate if the requester has the necessary permissions to access a specific route or resource. Every guard must implement the CanActivate interface and return either a boolean value or a Promise that resolves to a boolean - true allows the request to proceed, false blocks it with a 403 Forbidden response. </p> <h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;"> Why Guards? (The Security Boundary Philosophy) </h4> <p style="line-height: 1.75; margin-top: 1rem;"> Guards exist to enforce <strong>authorization boundaries</strong> in a clean, declarative way. The <strong>why</strong> behind guards is fundamental to application security: 1) <strong>Separation of Concerns:</strong> Guards extract authorization logic from controllers and services, keeping business logic focused on business rules rather than security checks. 2) <strong>Early Rejection:</strong> By positioning guards early in the request lifecycle (after middleware but before pipes/interceptors), unauthorized requests are rejected before expensive operations like database queries, validation, or business logic execution. 3) <strong>Declarative Security:</strong> Using decorators like <code>@UseGuards()</code> and <code>@Roles()</code>, security requirements become part of the API contract, making it clear which endpoints require which permissions. 4) <strong>Reusability:</strong> Guards can be applied at method, controller, or global levels, ensuring consistent security policies across the application. 5) <strong>Testability:</strong> Guards are pure functions (input: ExecutionContext, output: boolean) that can be unit tested in isolation. </p> <h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;"> What Are Guards? (Complete Definition and Core Components) </h4> <p style="line-height: 1.75; margin-top: 1rem;"> A guard is a class that implements the <code>CanActivate</code> interface and is decorated with <code>@Injectable()</code>. It acts as a <strong>gatekeeper</strong> that inspects the request context and decides whether to allow passage. The <strong>what</strong> includes: <ul style="margin-top: 1rem; margin-left: 1.5rem; list-style-type: disc;"> <li><strong>CanActivate Interface:</strong> The single method <code>canActivate(context: ExecutionContext)</code> that returns <code>boolean | Promise&lt;boolean&gt; | Observable&lt;boolean&gt;</code>.</li> <li><strong>ExecutionContext Access:</strong> Provides complete request context including HTTP request/response, WebSocket client, or RPC context.</li> <li><strong>Metadata Integration:</strong> Works with Reflector to read custom metadata attached via decorators (e.g., <code>@Roles()</code>, <code>@Public()</code>).</li> <li><strong>Dependency Injection Support:</strong> Guards participate in NestJS DI system, allowing injection of services, repositories, or configuration.</li> <li><strong>Transport Layer Agnostic:</strong> Works with HTTP, WebSockets, gRPC, and other transport layers through ExecutionContext abstraction.</li> </ul> Guards are not for authentication (verifying identity) but for authorization (verifying permissions). They assume authentication has already occurred and user identity is available in the request context. </p> <h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;"> How Guards Work: The Complete Flow (From Request Ingress to Guard Execution) </h4> <p style="line-height: 1.75; margin-top: 1rem;"> Understanding the <strong>how</strong> requires tracing the precise execution flow through NestJS's layered architecture: <ol style="margin-top: 1rem; margin-left: 1.5rem; list-style-type: decimal;"> <li><strong>Request Ingress & Middleware Processing:</strong> <ol style="margin-left: 1.5rem; margin-top: 0.5rem; list-style-type: lower-alpha;"> <li>HTTP request arrives and goes through global middleware (app.use())</li> <li>Route-specific middleware executes (if any)</li> <li>Authentication middleware (e.g., Passport JWT strategy) validates credentials and attaches user to <code>request.user</code></li> <li>Other middleware may add additional context (request ID, language, tenant info)</li> </ol> </li> <li><strong>Guard Execution Phase:</strong> <ol style="margin-left: 1.5rem; margin-top: 0.5rem; list-style-type: lower-alpha;"> <li>NestJS checks if route has guards applied (global, controller, or method level)</li> <li>For each guard in order of application: <ul style="margin-left: 1.5rem; margin-top: 0.25rem; list-style-type: circle;"> <li>Guard's <code>canActivate()</code> method is called with ExecutionContext</li> <li>Guard extracts request via <code>context.switchToHttp().getRequest()</code></li> <li>Guard reads metadata via Reflector if needed</li> <li>Guard performs authorization logic (synchronous or async)</li> <li>If guard returns <code>false</code> or throws exception → immediate termination</li> <li>If guard returns <code>true</code> → continues to next guard</li> </ul> </li> <li>All guards must return <code>true</code> for request to proceed</li> </ol> </li> <li><strong>Post-Guard Flow (If All Guards Pass):</strong> <ol style="margin-left: 1.5rem; margin-top: 0.5rem; list-style-type: lower-alpha;"> <li>Interceptors' pre-handler logic executes (if any interceptors applied)</li> <li>Pipes validate and transform parameters</li> <li>Route handler executes with business logic</li> <li>Interceptors' post-handler logic transforms response</li> <li>Exception filters handle any thrown exceptions</li> <li>Response sent to client</li> </ol> </li> <li><strong>Guard Failure Flow (If Any Guard Fails):</strong> <ol style="margin-left: 1.5rem; margin-top: 0.5rem; list-style-type: lower-alpha;"> <li>Immediate termination of request pipeline</li> <li>No interceptors, pipes, or handlers execute</li> <li>If guard threw exception → exception filters process it</li> <li>If guard returned <code>false</code> → NestJS throws <code>ForbiddenException</code></li> <li>Error response sent to client (403 Forbidden or custom status)</li> </ol> </li> </ol> This precise positioning makes guards efficient security checkpoints - they prevent wasted computation on unauthorized requests while having access to all authentication results from middleware. </p> <h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;"> Guard Anatomy and Implementation Details </h4> <p style="line-height: 1.75; margin-top: 1rem;"> A guard is a class decorated with <code>@Injectable()</code> that implements the <code>CanActivate</code> interface. The interface requires a single method: <code>canActivate(context: ExecutionContext)</code>, which must return a boolean, <code>Promise&lt;boolean&gt;</code>, or <code>Observable&lt;boolean&gt;</code>. Inside this method, you extract the request object from the ExecutionContext, examine relevant properties (user roles, permissions, tokens), and decide whether to grant access. Guards can be synchronous or asynchronous, allowing you to perform database lookups, external API calls, or complex business logic before making authorization decisions. </p> <div style="padding: 12px; border-radius: 8px; font-size: 14px; margin-top: 0.5rem; background-color: #f8fafc; border: 1px solid #e2e8f0;"> <pre><code class="language-typescript">// Complete guard implementation with all possible return types import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'; import { Observable, of } from 'rxjs'; import { map, catchError } from 'rxjs/operators';
@Injectable()
export class ComprehensiveGuard implements CanActivate {
// Synchronous implementation
canActivateSync(context: ExecutionContext): boolean {
const request = context.switchToHttp().getRequest();
return !!request.user && request.user.role === 'admin';
}

// Async/Promise implementation
async canActivateAsync(context: ExecutionContext): Promise<boolean> {
const request = context.switchToHttp().getRequest();
// Simulate async operation (database query, API call)
const user = await this.userService.findById(request.user.id);
return user.isActive && user.role === 'admin';
}

// Observable implementation (RxJS)
canActivateObservable(context: ExecutionContext): Observable<boolean> {
const request = context.switchToHttp().getRequest();
return this.authService.validateTokenObservable(request.token).pipe(
map(isValid => isValid && request.user.role === 'admin'),
catchError(() => of(false))
);
}

// The actual canActivate method - can use any of the above patterns
canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
// Choose implementation based on needs
return this.canActivateAsync(context);
}
}</code></pre>

</div> <h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;"> ExecutionContext Deep Dive: The Guard's Window into the Request </h4> <p style="line-height: 1.75; margin-top: 1rem;"> The <code>ExecutionContext</code> is a powerful abstraction that provides access to the current execution details. It extends <code>ArgumentsHost</code> and adds methods like <code>getHandler()</code> and <code>getClass()</code> to retrieve metadata about the controller method and class being executed. </p> <div style="padding: 12px; border-radius: 8px; font-size: 14px; margin-top: 0.5rem; background-color: #f8fafc; border: 1px solid #e2e8f0;"> <pre><code class="language-typescript">import { ExecutionContext } from '@nestjs/common';
export class DebugGuard implements CanActivate {
canActivate(context: ExecutionContext): boolean {
// 1. Switch to appropriate transport layer
const httpContext = context.switchToHttp();
const wsContext = context.switchToWs(); // For WebSockets
const rpcContext = context.switchToRpc(); // For microservices

 
// 2. Get request/response objects
const request = httpContext.getRequest();
const response = httpContext.getResponse();

// 3. Get handler and class metadata
const handler = context.getHandler(); // The route handler function
const controllerClass = context.getClass(); // The controller class

// 4. Get handler arguments
const args = context.getArgs(); // Original arguments array
const argHost = context.getArgByIndex(0); // Get specific argument

// 5. Access everything available in the request
console.log('Request Method:', request.method);
console.log('Request URL:', request.url);
console.log('Request Headers:', request.headers);
console.log('Request User:', request.user); // From authentication middleware
console.log('Request Params:', request.params);
console.log('Request Query:', request.query);
console.log('Request Body:', request.body);
console.log('Request IP:', request.ip);
console.log('Request Session:', request.session);

// 6. Handler metadata
console.log('Handler Name:', handler.name);
console.log('Controller:', controllerClass.name);

return true;
}
}</code></pre>

</div> <p style="line-height: 1.75; margin-top: 1rem;"> <strong>Key Insight:</strong> Guards run <em>after</em> middleware, so <code>request.user</code> should already be populated by authentication middleware (e.g., Passport JWT strategy). This is why guards focus on authorization (what you can do) not authentication (who you are). </p> <h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;"> Guard Binding Scopes: Method, Controller, and Global </h4> <ol style="margin-top: 1.5rem; margin-left: 1.5rem; list-style-type: number;"> <li style="margin-top: 0.5rem;"> <span style="font-weight: 600; font-size: 1.1rem;">Method-scoped Guards:</span> Applied to individual route handlers using <code>@UseGuards()</code> decorator. Provides fine-grained control over specific endpoints. Only affects the decorated method. <div style="padding: 12px; border-radius: 8px; font-size: 14px; margin-top: 0.5rem; background-color: #f8fafc; border: 1px solid #e2e8f0;"> <pre><code class="language-typescript">@Controller('users') export class UsersController { // Public endpoint - no guard @Get('public') getPublicData() { return { message: 'Anyone can access this' }; }
// Protected endpoint - method-scoped guard
@Get('profile')
@UseGuards(AuthGuard) // Only this method is protected
getProfile() {
return { message: 'Only authenticated users' };
}

// Multiple guards on single method
@Get('admin')
@UseGuards(AuthGuard, AdminGuard, AuditGuard) // All three must pass
getAdminData() {
return { message: 'Admin only data' };
}
}</code></pre>
</div>
</li>
<li style="margin-top: 0.5rem;">
<span style="font-weight: 600; font-size: 1.1rem;">Controller-scoped Guards:</span> Applied at the controller level, protecting all routes within that controller. Reduces duplication when all endpoints share the same authorization requirements.
<div style="padding: 12px; border-radius: 8px; font-size: 14px; margin-top: 0.5rem; background-color: #f8fafc; border: 1px solid #e2e8f0;">
<pre><code class="language-typescript">// All routes in this controller require authentication
@Controller('admin')
@UseGuards(AuthGuard) // Applied to all methods in controller
export class AdminController {
@Get('dashboard')
getDashboard() {
return { message: 'Admin dashboard' };
}

@Get('users')
getUsers() {
return { message: 'User list' };
}

// Can override at method level
@Get('public-stats')
@UseGuards(PublicGuard) // Overrides controller guard
getPublicStats() {
return { message: 'Public stats' };
}
}</code></pre>
</div>
</li>
<li style="margin-top: 0.5rem;">
<span style="font-weight: 600; font-size: 1.1rem;">Global Guards:</span> Applied to every route in the application using <code>app.useGlobalGuards()</code> or <code>APP_GUARD</code> provider. Perfect for universal requirements like authentication checks. Can be overridden by method-specific guards.
<div style="padding: 12px; border-radius: 8px; font-size: 14px; margin-top: 0.5rem; background-color: #f8fafc; border: 1px solid #e2e8f0;">
<pre><code class="language-typescript">// Method 1: In main.ts (no dependency injection)
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './guards/auth.guard';

async function bootstrap() {
const app = await NestFactory.create(AppModule);

// Global guard - applies to ALL routes
app.useGlobalGuards(new AuthGuard());
// Problem: Can't inject dependencies into AuthGuard

await app.listen(3000);
}

// Method 2: Using APP_GUARD provider (preferred - enables DI)
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { UserService } from './users/user.service';

@Module({
providers: [
UserService,
{
provide: APP_GUARD,
useClass: AuthGuard, // Now AuthGuard can inject UserService
},
],
})
export class AppModule {}</code></pre>
</div>
</li>

</ol> <h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;"> Authentication vs Authorization: The Critical Distinction </h4> <p style="line-height: 1.75; margin-top: 1rem;"> This is a critical distinction that frequently appears in interviews. <strong>Authentication (AuthN)</strong> is the process of verifying WHO the user is - confirming their identity through credentials like username/password, JWT tokens, OAuth, or biometrics. This is typically handled by authentication strategies (Passport strategies in NestJS) and middleware that attach user information to the request. <strong>Authorization (AuthZ)</strong> is determining WHAT the authenticated user can do - checking if they have permission to access specific resources or perform certain actions. This is where Guards excel. Guards assume authentication has already occurred (user is identified) and focus on permission checking (can this user access this resource?). For example, a JWT strategy authenticates the user by validating their token, while a RolesGuard checks if that authenticated user has the 'admin' role required to access an endpoint. </p> <div style="padding: 12px; border-radius: 8px; font-size: 14px; margin-top: 0.5rem; background-color: #f8fafc; border: 1px solid #e2e8f0;"> <pre><code class="language-typescript">// AUTHENTICATION (WHO) - Usually in middleware or Passport strategy // This happens BEFORE guards in the request lifecycle
// JWT Strategy (Passport) - Authentication
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
constructor() {
super({
jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
secretOrKey: 'secret',
});
}

async validate(payload: any) {
// Verify JWT and return user
return { id: payload.sub, email: payload.email, roles: payload.roles };
// This gets attached to request.user by Passport
}
}

// AUTHENTICATION MIDDLEWARE - Attaches user to request
// This runs BEFORE guards
app.use((req, res, next) => {
const token = req.headers.authorization?.split(' ')[1];
if (token) {
try {
const user = jwt.verify(token, 'secret');
req.user = user; // Authentication complete
} catch {
req.user = null;
}
}
next();
});

// AUTHORIZATION (WHAT) - Guard checks permissions
// This runs AFTER authentication middleware
@Injectable()
export class RolesGuard implements CanActivate {
canActivate(context: ExecutionContext): boolean {
const request = context.switchToHttp().getRequest();
const user = request.user; // Already authenticated by middleware

 
// Authorization check: does user have admin role?
return user?.roles?.includes('admin'); // true/false
}
}</code></pre>

</div> <h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;"> Role-Based Access Control (RBAC) Implementation Pattern </h4> <p style="line-height: 1.75; margin-top: 1rem;"> RBAC is one of the most common use cases for guards. You define roles (admin, user, moderator) and assign them to users. Guards then check if the current user's role matches the required role(s) for a route. This typically involves: (1) Creating a custom decorator (<code>@Roles('admin')</code>) to specify required roles on route handlers, (2) Using Reflector in the guard to read the metadata set by the decorator, (3) Comparing the user's roles (from <code>request.user</code>) against the required roles, (4) Returning true if there's a match, false otherwise. This pattern is flexible and can be extended to more complex permission systems with hierarchical roles or fine-grained permissions. </p> <div style="padding: 12px; border-radius: 8px; font-size: 14px; margin-top: 0.5rem; background-color: #f8fafc; border: 1px solid #e2e8f0;"> <pre><code class="language-typescript">// Step 1: Create custom decorator to attach metadata import { SetMetadata } from '@nestjs/common';
export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

// Step 2: Implement the RolesGuard
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
constructor(private reflector: Reflector) {}

canActivate(context: ExecutionContext): boolean {
// Read metadata from handler AND controller (handler overrides controller)
const requiredRoles = this.reflector.getAllAndOverride<string[]>(
ROLES_KEY,
[context.getHandler(), context.getClass()]
);

 
// If no roles required, allow access
if (!requiredRoles) {
  return true;
}

// Get user from request (already authenticated by middleware)
const request = context.switchToHttp().getRequest();
const user = request.user;

// Check if user has at least one of the required roles
return requiredRoles.some((role) => user?.roles?.includes(role));
}
}

// Step 3: Use in controller
@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard) // Auth first, then role check
export class UsersController {
@Get()
@Roles('user', 'admin') // User OR admin can access
findAll() {
return this.usersService.findAll();
}

@Post()
@Roles('admin') // Only admin can create
create(@Body() createUserDto: CreateUserDto) {
return this.usersService.create(createUserDto);
}

@Delete(':id')
@Roles('superadmin') // Only superadmin can delete
remove(@Param('id') id: string) {
return this.usersService.remove(id);
}
}

// Flow when GET /users is called:
// 1. AuthGuard('jwt') validates JWT, attaches user to request
// 2. RolesGuard reads @Roles('user', 'admin') metadata
// 3. Checks if request.user.roles includes 'user' OR 'admin'
// 4. Returns true/false based on check</code></pre>

</div> <h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;"> Request Lifecycle Position: Before and After Guards </h4> <p style="line-height: 1.75; margin-top: 1rem;"> Understanding where guards fit in the request lifecycle is crucial for interviews and practical implementation. The complete order with examples: </p> <div style="padding: 12px; border-radius: 8px; font-size: 14px; margin-top: 0.5rem; background-color: #f8fafc; border: 1px solid #e2e8f0;"> <pre><code class="language-typescript">// Complete request lifecycle demonstration import { Controller, Get, UseGuards, UseInterceptors, UsePipes, Body, ValidationPipe, createParamDecorator } from '@nestjs/common'; import { LoggingInterceptor, TransformInterceptor } from './interceptors'; import { AuthGuard, RolesGuard } from './guards';
// Custom middleware (executes BEFORE guards)
const AuthenticationMiddleware = (req, res, next) => {
console.log('1. Middleware: Authenticating user...');
req.user = { id: 1, roles: ['user'] }; // Simulate authentication
next();
};

// Custom pipe (executes AFTER guards if they pass)
const ValidationPipeExample = {
transform(value: any, metadata) {
console.log('4. Pipe: Validating and transforming data...');
return value;
}
};

@Controller('demo')
export class DemoController {
@Get('protected')
@UseGuards(AuthGuard, RolesGuard) // 2. Guards execute here
@UseInterceptors(LoggingInterceptor) // 3. Interceptors (before handler)
@UsePipes(ValidationPipeExample) // 4. Pipes
getProtectedData() {
console.log('5. Handler: Executing business logic...');
return { data: 'protected' };
}
}

// Request lifecycle when calling GET /demo/protected:
// 1. AuthenticationMiddleware executes → attaches user to request
// 2. AuthGuard checks if user exists → passes
// 3. RolesGuard checks if user has required role → passes
// 4. LoggingInterceptor pre-handler logic executes
// 5. ValidationPipe validates/transforms parameters
// 6. Route handler executes business logic
// 7. LoggingInterceptor post-handler logic executes
// 8. Response sent to client

// If AuthGuard returns false:
// 1. AuthenticationMiddleware executes
// 2. AuthGuard returns false → REQUEST STOPS HERE
// 3. No interceptors, pipes, or handlers execute
// 4. 403 Forbidden response sent immediately</code></pre>

</div> <h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;"> Custom Metadata and Reflector: Making Guards Configurable </h4> <p style="line-height: 1.75; margin-top: 1rem;"> Guards often need to access custom metadata attached to routes via decorators. The <code>Reflector</code> class provides methods to retrieve this metadata. You inject Reflector into your guard's constructor and use <code>reflector.get()</code> or <code>reflector.getAllAndOverride()</code> to read metadata keys. For example, a <code>@Public()</code> decorator might set metadata indicating a route should skip authentication. Your guard reads this metadata and returns true immediately for public routes. This pattern makes guards highly configurable and allows you to express authorization rules declaratively in your controllers rather than hardcoding logic in the guard itself. </p> <div style="padding: 12px; border-radius: 8px; font-size: 14px; margin-top: 0.5rem; background-color: #f8fafc; border: 1px solid #e2e8f0;"> <pre><code class="language-typescript">// Advanced metadata usage with Reflector import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'; import { Reflector } from '@nestjs/core'; import { SetMetadata } from '@nestjs/common';
// Multiple custom decorators for different metadata
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const PERMISSIONS_KEY = 'permissions';
export const RequirePermissions = (...perms: string[]) =>
SetMetadata(PERMISSIONS_KEY, perms);

export const RESOURCE_KEY = 'resource';
export const Resource = (resource: string) => SetMetadata(RESOURCE_KEY, resource);

@Injectable()
export class AdvancedGuard implements CanActivate {
constructor(private reflector: Reflector) {}

async canActivate(context: ExecutionContext): Promise<boolean> {
// Check if route is marked as public
const isPublic = this.reflector.getAllAndOverride<boolean>(
IS_PUBLIC_KEY,
[context.getHandler(), context.getClass()]
);

 
if (isPublic) {
  return true; // Skip all checks for public routes
}

const request = context.switchToHttp().getRequest();
const user = request.user;

// Get required permissions from metadata
const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
  PERMISSIONS_KEY,
  [context.getHandler(), context.getClass()]
);

// Get resource type from metadata
const resourceType = this.reflector.getAllAndOverride<string>(
  RESOURCE_KEY,
  [context.getHandler(), context.getClass()]
);

// Complex authorization logic based on metadata
if (requiredPermissions) {
  const hasAllPermissions = requiredPermissions.every(perm =>
    user.permissions?.includes(perm)
  );
  if (!hasAllPermissions) {
    return false;
  }
}

if (resourceType) {
  // Check if user can access this resource type
  const canAccess = await this.checkResourceAccess(user, resourceType);
  if (!canAccess) {
    return false;
  }
}

return true;
}

private async checkResourceAccess(user: any, resourceType: string): Promise<boolean> {
// Complex business logic, database queries, etc.
return true;
}
}

// Usage with multiple metadata decorators
@Controller('articles')
@UseGuards(AdvancedGuard)
export class ArticlesController {
@Get()
@Public() // Skip guard entirely
findAll() {
return this.articlesService.findAll();
}

@Get(':id')
@Resource('article') // Guard checks article resource access
findOne(@Param('id') id: string) {
return this.articlesService.findOne(id);
}

@Post()
@RequirePermissions('article:write') // Guard checks permission
create(@Body() createArticleDto: CreateArticleDto) {
return this.articlesService.create(createArticleDto);
}
}</code></pre>

</div> <h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;"> Error Handling in Guards: Return false vs Throw Exception </h4> <p style="line-height: 1.75; margin-top: 1rem;"> When a guard denies access, you have two options: return <code>false</code> (results in a generic 403 Forbidden response) or throw an exception (allows custom error messages and status codes). Throwing exceptions is generally preferred in production because it provides better feedback to clients. You can throw <code>UnauthorizedException</code> (401) if the user isn't authenticated, <code>ForbiddenException</code> (403) if they're authenticated but lack permissions, or custom exceptions with detailed messages. Guards should throw exceptions rather than return false when you need to provide context about why access was denied. NestJS's exception filters will handle these exceptions and format appropriate error responses. </p> <div style="padding: 12px; border-radius: 8px; font-size: 14px; margin-top: 0.5rem; background-color: #f8fafc; border: 1px solid #e2e8f0;"> <pre><code class="language-typescript">import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException, HttpException, HttpStatus } from '@nestjs/common';
@Injectable()
export class ErrorHandlingGuard implements CanActivate {
canActivate(context: ExecutionContext): boolean {
const request = context.switchToHttp().getRequest();
const user = request.user;

 
// Option 1: Return false (not recommended for production)
// Results in generic 403 Forbidden with no details
if (!user) {
  return false; // Generic 403
}

// Option 2: Throw UnauthorizedException (401)
// Use when user is not authenticated at all
if (!user) {
  throw new UnauthorizedException('Please login to access this resource');
}

// Option 3: Throw ForbiddenException (403)
// Use when user is authenticated but lacks permissions
if (!user.roles?.includes('admin')) {
  throw new ForbiddenException(
    'Admin role required to access this endpoint',
    'ADMIN_REQUIRED' // Custom error code
  );
}

// Option 4: Throw custom HttpException with any status code
if (user.accountLocked) {
  throw new HttpException(
    {
      statusCode: 423,
      message: 'Account is locked. Contact support.',
      errorCode: 'ACCOUNT_LOCKED',
      supportEmail: 'support@example.com'
    },
    HttpStatus.LOCKED
  );
}

// Option 5: Throw custom business exception
if (user.subscriptionExpired) {
  throw new SubscriptionRequiredException(
    'Premium subscription required',
    { plan: 'premium', upgradeUrl: '/upgrade' }
  );
}

return true;
}
}

// Custom exception for business logic
export class SubscriptionRequiredException extends HttpException {
constructor(message: string, metadata: any) {
super(
{
message,
...metadata,
statusCode: 402, // Payment Required
error: 'SUBSCRIPTION_REQUIRED'
},
402
);
}
}

// Usage - clients get detailed error responses
@Controller('premium')
@UseGuards(ErrorHandlingGuard)
export class PremiumController {
@Get('content')
getContent() {
return { content: 'premium' };
}
}

// Client receives detailed error if unauthorized:
// {
// "statusCode": 402,
// "message": "Premium subscription required",
// "plan": "premium",
// "upgradeUrl": "/upgrade",
// "error": "SUBSCRIPTION_REQUIRED"
// }</code></pre>

</div> <h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;"> Combining Multiple Guards: Execution Order and Composition </h4> <p style="line-height: 1.75; margin-top: 1rem;"> You can apply multiple guards to a single route using <code>@UseGuards(Guard1, Guard2, Guard3)</code>. They execute in the order specified, and ALL must return <code>true</code> for the request to proceed. If any guard returns <code>false</code> or throws an exception, processing stops immediately. This allows you to compose complex authorization logic from simple, single-purpose guards. For example, you might have an AuthGuard to verify the user is logged in, followed by a RolesGuard to check their role, followed by a SubscriptionGuard to verify they have an active subscription. Each guard focuses on one concern, making them easier to test and maintain. </p> <div style="padding: 12px; border-radius: 8px; font-size: 14px; margin-top: 0.5rem; background-color: #f8fafc; border: 1px solid #e2e8f0;"> <pre><code class="language-typescript">// Example of guard composition import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// Guard 1: Check authentication
@Injectable()
export class AuthGuard implements CanActivate {
canActivate(context: ExecutionContext): boolean {
const request = context.switchToHttp().getRequest();
console.log('AuthGuard: Checking authentication...');
return !!request.user; // Must have user object
}
}

// Guard 2: Check role
@Injectable()
export class RolesGuard implements CanActivate {
canActivate(context: ExecutionContext): boolean {
const request = context.switchToHttp().getRequest();
console.log('RolesGuard: Checking roles...');
return request.user?.roles?.includes('admin');
}
}

// Guard 3: Check subscription
@Injectable()
export class SubscriptionGuard implements CanActivate {
canActivate(context: ExecutionContext): boolean {
const request = context.switchToHttp().getRequest();
console.log('SubscriptionGuard: Checking subscription...');
return request.user?.hasActiveSubscription;
}
}

// Guard 4: Check ownership
@Injectable()
export class OwnershipGuard implements CanActivate {
canActivate(context: ExecutionContext): boolean {
const request = context.switchToHttp().getRequest();
console.log('OwnershipGuard: Checking ownership...');
return request.user?.id === request.params.userId;
}
}

// Using multiple guards in sequence
@Controller('premium-content')
export class PremiumContentController {
// All 4 guards execute in order
@Get('admin-content')
@UseGuards(AuthGuard, RolesGuard, SubscriptionGuard)
getAdminContent() {
console.log('Handler: Returning admin content...');
return { content: 'admin premium content' };
}

// Different combination for different endpoint
@Get('user-content/:userId')
@UseGuards(AuthGuard, OwnershipGuard, SubscriptionGuard)
getUserContent(@Param('userId') userId: string) {
console.log('Handler: Returning user content...');
return { content: 'user premium content' };
}

// Single guard for simple case
@Get('free-content')
@UseGuards(AuthGuard) // Only authentication required
getFreeContent() {
return { content: 'free content' };
}
}

// Execution flow for GET /premium-content/admin-content:
// 1. AuthGuard executes → checks authentication → passes
// 2. RolesGuard executes → checks admin role → passes
// 3. SubscriptionGuard executes → checks subscription → passes
// 4. Handler executes → returns content

// If any guard fails, execution stops immediately:
// 1. AuthGuard executes → no user → returns false
// 2. EXECUTION STOPS - RolesGuard and SubscriptionGuard never run
// 3. 403 Forbidden response sent</code></pre>

</div> <h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;"> Integration with Passport: Authentication + Authorization </h4> <p style="line-height: 1.75; margin-top: 1rem;"> Passport is the de facto authentication library for Node.js, and NestJS provides seamless integration through <code>@nestjs/passport</code>. <code>AuthGuard('jwt')</code> or <code>AuthGuard('local')</code> are built-in guards that trigger Passport strategies. When you use <code>@UseGuards(AuthGuard('jwt'))</code>, NestJS invokes the JWT strategy to validate the token, extract user information, and attach it to <code>request.user</code>. This is authentication, not authorization - the guard ensures the user is who they claim to be. You then combine this with custom authorization guards to check permissions. For example, <code>@UseGuards(AuthGuard('jwt'), RolesGuard)</code> first authenticates the user, then checks their role. </p> <div style="padding: 12px; border-radius: 8px; font-size: 14px; margin-top: 0.5rem; background-color: #f8fafc; border: 1px solid #e2e8f0;"> <pre><code class="language-typescript">// Complete authentication + authorization with Passport import { Controller, Get, UseGuards, Request } from '@nestjs/common'; import { AuthGuard } from '@nestjs/passport'; import { RolesGuard } from './roles.guard'; import { Roles } from './roles.decorator';
// JWT Strategy (authentication)
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
constructor() {
super({
jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
secretOrKey: process.env.JWT_SECRET,
});
}

async validate(payload: any) {
// This is authentication: verify JWT and return user
return {
userId: payload.sub,
email: payload.email,
roles: payload.roles,
permissions: payload.permissions
};
// Passport automatically attaches this to request.user
}
}

// RolesGuard (authorization)
@Injectable()
export class RolesGuard implements CanActivate {
constructor(private reflector: Reflector) {}

canActivate(context: ExecutionContext): boolean {
const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
if (!requiredRoles) return true;

 
const request = context.switchToHttp().getRequest();
const user = request.user; // Already populated by AuthGuard('jwt')

return requiredRoles.some(role => user?.roles?.includes(role));
}
}

// Controller using both
@Controller('secure')
export class SecureController {
// Authentication + Authorization combined
@Get('admin-data')
@UseGuards(AuthGuard('jwt'), RolesGuard) // AuthN then AuthZ
@Roles('admin')
getAdminData(@Request() req) {
// req.user is available because AuthGuard('jwt') authenticated
return { data: 'admin only', user: req.user };
}

// Just authentication (no specific role required)
@Get('user-data')
@UseGuards(AuthGuard('jwt')) // Only authentication
getUserData(@Request() req) {
return { data: 'any authenticated user', user: req.user };
}

// Custom authentication guard with options
@Get('optional-auth')
@UseGuards(OptionalJwtAuthGuard) // Custom guard that doesn't fail if no token
getOptionalData(@Request() req) {
return { data: 'works with or without auth', user: req.user || null };
}
}

// Optional JWT guard for public/private hybrid endpoints
@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
handleRequest(err, user, info, context) {
// Don't throw error if no token - just return null user
if (err || !user) {
return null; // No user, but don't fail the guard
}
return user;
}
}

// Flow for GET /secure/admin-data:
// 1. AuthGuard('jwt') executes → validates JWT via JwtStrategy
// 2. JwtStrategy.validate() returns user object
// 3. AuthGuard attaches user to request.user
// 4. RolesGuard executes → reads @Roles('admin') metadata
// 5. Checks if request.user.roles includes 'admin'
// 6. If yes → handler executes, if no → 403 Forbidden</code></pre>

</div> <h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;"> Best Practices (Production-Grade Guidelines) </h4> <ol style="margin-top: 1.5rem; margin-left: 1.5rem; list-style-type: number;"> <li style="margin-top: 0.5rem;"> <span style="font-weight: 600;">Single Responsibility:</span> Each guard should check one concern (authentication, role, ownership, subscription). Compose multiple guards instead of creating complex mega-guards. </li> <li style="margin-top: 0.5rem;"> <span style="font-weight: 600;">Throw Exceptions for Context:</span> Prefer throwing exceptions over returning false to provide meaningful error messages to clients. </li> <li style="margin-top: 0.5rem;"> <span style="font-weight: 600;">Use Metadata for Configuration:</span> Define authorization requirements declaratively with custom decorators rather than hardcoding rules. </li> <li style="margin-top: 0.5rem;"> <span style="font-weight: 600;">Inject Dependencies:</span> Guards are part of the DI system - inject services, repositories, or configuration as needed for complex checks. </li> <li style="margin-top: 0.5rem;"> <span style="font-weight: 600;">Handle Edge Cases:</span> Always check if request.user exists before accessing properties to avoid runtime errors. </li> <li style="margin-top: 0.5rem;"> <span style="font-weight: 600;">Test Guards Thoroughly:</span> Unit test guards with mocked ExecutionContext to verify they handle all scenarios correctly. </li> <li style="margin-top: 0.5rem;"> <span style="font-weight: 600;">Document Authorization Rules:</span> Make it clear which guards protect which endpoints and why. </li> <li style="margin-top: 0.5rem;"> <span style="font-weight: 600;">Consider Performance:</span> Guards run on every request. Cache expensive operations (database queries) when possible. </li> <li style="margin-top: 0.5rem;"> <span style="font-weight: 600;">Use APP_GUARD for Global Guards:</span> Enables dependency injection compared to app.useGlobalGuards(). </li> <li style="margin-top: 0.5rem;"> <span style="font-weight: 600;">Order Guards Logically:</strong> Place authentication guards before authorization guards in <code>@UseGuards()</code> lists. </li> </ol> <h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;"> Common Guard Patterns and Real-World Examples </h4> <ol style="margin-top: 1.5rem; margin-left: 1.5rem; list-style-type: number;"> <li style="margin-top: 0.5rem;"> <span style="font-weight: 600; font-size: 1.1rem;">Authentication Guard:</span> Verifies user is logged in by checking for valid JWT token or session. </li> <li style="margin-top: 0.5rem;"> <span style="font-weight: 600; font-size: 1.1rem;">Role Guard:</span> Checks if authenticated user has required role(s) to access the resource. </li> <li style="margin-top: 0.5rem;"> <span style="font-weight: 600; font-size: 1.1rem;">Ownership Guard:</span> Verifies user owns the resource they're trying to access (e.g., own profile, own orders). </li> <li style="margin-top: 0.5rem;"> <span style="font-weight: 600; font-size: 1.1rem;">Throttle Guard:</span> Rate limiting to prevent abuse (though @nestjs/throttler is preferred). </li> <li style="margin-top: 0.5rem;"> <span style="font-weight: 600; font-size: 1.1rem;">Feature Flag Guard:</span> Enables/disables features based on configuration or A/B testing. </li> <li style="margin-top: 0.5rem;"> <span style="font-weight: 600; font-size: 1.1rem;">Permission Guard:</span> Fine-grained permissions checking (can_read, can_write, can_delete). </li> <li style="margin-top: 0.5rem;"> <span style="font-weight: 600; font-size: 1.1rem;">Tenant Guard:</span> Multi-tenancy - ensures user only accesses their tenant's data. </li> <li style="margin-top: 0.5rem;"> <span style="font-weight: 600; font-size: 1.1rem;">Subscription Guard:</span> Checks if user has active/appropriate subscription plan. </li> <li style="margin-top: 0.5rem;"> <span style="font-weight: 600; font-size: 1.1rem;">IP Whitelist Guard:</span> Restricts access to specific IP addresses or ranges. </li> <li style="margin-top: 0.5rem;"> <span style="font-weight: 600; font-size: 1.1rem;">Time-based Guard:</span> Restricts access based on time of day or date ranges. </li> </ol> <h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;"> Performance Considerations and Optimization </h4> <p style="line-height: 1.75; margin-top: 1rem;"> Guards run on every request, so performance matters. Avoid heavy computations or slow database queries in guards when possible. Cache frequently accessed data like user roles or permissions. Use efficient database queries with proper indexing if you must query the database. Consider using Redis or in-memory caching for permission lookups. Keep guards fast because they block the entire request pipeline - a slow guard affects every downstream component. If complex authorization logic is needed, consider moving some checks to the service layer where you have more flexibility to optimize and parallelize operations. </p> <div style="padding: 12px; border-radius: 8px; font-size: 14px; margin-top: 0.5rem; background-color: #f8fafc; border: 1px solid #e2e8f0;"> <pre><code class="language-typescript">// Optimized guard with caching import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common'; import { CACHE_MANAGER } from '@nestjs/cache-manager'; import { Cache } from 'cache-manager';
@Injectable()
export class OptimizedRolesGuard implements CanActivate {
constructor(
@Inject(CACHE_MANAGER) private cacheManager: Cache,
private userService: UserService
) {}

async canActivate(context: ExecutionContext): Promise<boolean> {
const request = context.switchToHttp().getRequest();
const user = request.user;

 
if (!user) {
  return false;
}

// Cache user roles to avoid database hit on every request
const cacheKey =  user: $ { user.id }: roles;
let roles = await this.cacheManager.get<string[]>(cacheKey);

if (!roles) {
  // Database query only on cache miss
  roles = await this.userService.getUserRoles(user.id);
  // Cache for 5 minutes
  await this.cacheManager.set(cacheKey, roles, 300000);
}

// Check roles (now from cache or DB)
const requiredRoles = ['admin', 'moderator'];
return requiredRoles.some(role => roles.includes(role));
}
}

// Lazy-loaded guard for expensive operations
@Injectable()
export class LazyAuthorizationGuard implements CanActivate {
constructor(private permissionService: PermissionService) {}

async canActivate(context: ExecutionContext): Promise<boolean> {
const request = context.switchToHttp().getRequest();

 
// Quick checks first
if (!request.user) {
  return false;
}

// Expensive check only if quick checks pass
const resourceId = request.params.id;
const hasAccess = await this.permissionService.checkAccess(
  request.user.id,
  resourceId
);

return hasAccess;
}
}</code></pre>

</div></div>`,
    examples: [`// Complete Real-World Guard Implementation: Multi-Tenant SaaS Application import { Injectable, CanActivate, ExecutionContext, ForbiddenException, Inject } from '@nestjs/common'; import { Reflector } from '@nestjs/core'; import { CACHE_MANAGER } from '@nestjs/cache-manager'; import { Cache } from 'cache-manager'; import { TenantService } from '../tenants/tenant.service'; import { SubscriptionService } from '../subscriptions/subscription.service';
// Custom metadata decorators
export const TENANT_ACCESS_KEY = 'tenantAccess';
export const TenantAccess = (accessLevel: 'read' | 'write' | 'admin') =>
SetMetadata(TENANT_ACCESS_KEY, accessLevel);

export const FEATURE_FLAG_KEY = 'featureFlag';
export const FeatureFlag = (feature: string) =>
SetMetadata(FEATURE_FLAG_KEY, feature);

export const SUBSCRIPTION_PLAN_KEY = 'subscriptionPlan';
export const RequiresPlan = (plan: string) =>
SetMetadata(SUBSCRIPTION_PLAN_KEY, plan);

@Injectable()
export class SaaSGuard implements CanActivate {
constructor(
private reflector: Reflector,
@Inject(CACHE_MANAGER) private cacheManager: Cache,
private tenantService: TenantService,
private subscriptionService: SubscriptionService
) {}

async canActivate(context: ExecutionContext): Promise<boolean> {
const request = context.switchToHttp().getRequest();
const user = request.user;

 
// === STEP 1: BASIC AUTHENTICATION CHECK ===
if (!user) {
  throw new ForbiddenException({
    code: 'AUTH_REQUIRED',
    message: 'Authentication required',
    hint: 'Please login with valid credentials'
  });
}

// === STEP 2: TENANT CONTEXT VALIDATION ===
// Extract tenant ID from request (header, subdomain, or JWT)
const tenantId = this.extractTenantId(request);
if (!tenantId) {
  throw new ForbiddenException({
    code: 'TENANT_REQUIRED',
    message: 'Tenant context required',
    hint: 'Include X-Tenant-ID header or use tenant subdomain'
  });
}

// Check if user belongs to this tenant (cached)
const userTenantsCacheKey = user:$ {user.id}:tenants;
let userTenants = await this.cacheManager.get<string[]>(userTenantsCacheKey);

if (!userTenants) {
  userTenants = await this.tenantService.getUserTenants(user.id);
  await this.cacheManager.set(userTenantsCacheKey, userTenants, 300000); // 5 min
}

if (!userTenants.includes(tenantId)) {
  throw new ForbiddenException({
    code: 'TENANT_ACCESS_DENIED',
    message: 'You do not have access to this tenant',
    tenantId,
    hint: 'Contact your tenant administrator for access'
  });
}

// Attach tenant context to request for downstream use
request.tenant = { id: tenantId };

// === STEP 3: TENANT ACCESS LEVEL CHECK ===
const requiredAccessLevel = this.reflector.getAllAndOverride<'read' | 'write' | 'admin'>(
  TENANT_ACCESS_KEY,
  [context.getHandler(), context.getClass()]
);

if (requiredAccessLevel) {
  const userAccessLevel = await this.getUserAccessLevel(user.id, tenantId);
  if (!this.hasRequiredAccess(userAccessLevel, requiredAccessLevel)) {
    throw new ForbiddenException({
      code: 'INSUFFICIENT_ACCESS',
      message: \`\$ {requiredAccessLevel} access level required\`,
      currentLevel: userAccessLevel,
      requiredLevel: requiredAccessLevel
    });
  }
}

// === STEP 4: SUBSCRIPTION PLAN CHECK ===
const requiredPlan = this.reflector.getAllAndOverride<string>(
  SUBSCRIPTION_PLAN_KEY,
  [context.getHandler(), context.getClass()]
);

if (requiredPlan) {
  const activePlan = await this.subscriptionService.getActivePlan(tenantId);
  if (activePlan !== requiredPlan && activePlan !== 'enterprise') {
    throw new ForbiddenException({
      code: 'PLAN_REQUIRED',
      message: \`\$ {requiredPlan} plan required for this feature\`,
      currentPlan: activePlan,
      upgradeUrl: \`/billing/upgrade?plan=\$ {requiredPlan}\`
    });
  }
}

// === STEP 5: FEATURE FLAG CHECK ===
const requiredFeature = this.reflector.getAllAndOverride<string>(
  FEATURE_FLAG_KEY,
  [context.getHandler(), context.getClass()]
);

if (requiredFeature) {
  const isFeatureEnabled = await this.isFeatureEnabled(tenantId, requiredFeature);
  if (!isFeatureEnabled) {
    throw new ForbiddenException({
      code: 'FEATURE_DISABLED',
      message: \`Feature "\$ {requiredFeature}" is not enabled for your tenant\`,
      feature: requiredFeature,
      hint: 'Contact support to enable this feature'
    });
  }
}

// === STEP 6: RATE LIMITING (Simplified) ===
const rateLimitKey = user:$ {user.id}:$ {context.getHandler().name}:requests;
const requestCount = await this.cacheManager.get<number>(rateLimitKey) || 0;

if (requestCount > 100) { // 100 requests per minute
  throw new ForbiddenException({
    code: 'RATE_LIMIT_EXCEEDED',
    message: 'Rate limit exceeded',
    limit: 100,
    resetIn: '1 minute'
  });
}

await this.cacheManager.set(rateLimitKey, requestCount + 1, 60000); // 1 minute TTL

return true;
}

private extractTenantId(request: any): string {
// Check multiple sources for tenant ID
return (
request.headers['x-tenant-id'] ||
request.user?.tenantId || // From JWT
request.subdomains?.[0] || // From subdomain
request.query.tenantId
);
}

private async getUserAccessLevel(userId: string, tenantId: string): Promise<string> {
const cacheKey = user:$ {userId}:tenant:$ {tenantId}:access;$ 
const cached = await this.cacheManager.get<string>(cacheKey);

 
if (cached) {
  return cached;
}

const accessLevel = await this.tenantService.getUserAccessLevel(userId, tenantId);
await this.cacheManager.set(cacheKey, accessLevel, 300000); // 5 min

return accessLevel;
}

private hasRequiredAccess(userLevel: string, requiredLevel: string): boolean {
const levels = { 'read': 1, 'write': 2, 'admin': 3 };
return levels[userLevel] >= levels[requiredLevel];
}

private async isFeatureEnabled(tenantId: string, feature: string): Promise<boolean> {
const cacheKey = tenant:$ {tenantId}:feature:$ {feature};
const cached = await this.cacheManager.get<boolean>(cacheKey);

 
if (cached !== undefined) {
  return cached;
}

const enabled = await this.tenantService.isFeatureEnabled(tenantId, feature);
await this.cacheManager.set(cacheKey, enabled, 300000); // 5 min

return enabled;
}
}

// Usage in a multi-tenant SaaS controller
@Controller('api/v1')
@UseGuards(AuthGuard('jwt'), SaaSGuard)
export class TenantAwareController {
// Public tenant info (read access required)
@Get('tenants/:id')
@TenantAccess('read')
getTenant(@Param('id') id: string) {
return this.tenantService.getTenant(id);
}

// Update tenant settings (write access required)
@Put('tenants/:id/settings')
@TenantAccess('write')
updateSettings(@Param('id') id: string, @Body() settings: any) {
return this.tenantService.updateSettings(id, settings);
}

// Admin-only tenant operations
@Delete('tenants/:id')
@TenantAccess('admin')
deleteTenant(@Param('id') id: string) {
return this.tenantService.deleteTenant(id);
}

// Premium feature (requires 'premium' plan)
@Get('analytics')
@RequiresPlan('premium')
getAnalytics() {
return this.analyticsService.getData();
}

// Beta feature (requires feature flag)
@Get('beta-feature')
@FeatureFlag('beta_dashboard')
getBetaFeature() {
return { data: 'beta feature' };
}

// Enterprise-only feature
@Get('enterprise-reports')
@RequiresPlan('enterprise')
@TenantAccess('admin')
getEnterpriseReports() {
return this.reportService.getEnterpriseReports();
}
}`,


        `// Comprehensive Testing Suite for Guards
import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { RolesGuard } from './roles.guard';
import { SaaSGuard } from './saas.guard';

describe('RolesGuard', () => {
let guard: RolesGuard;
let reflector: Reflector;

// Mock implementations
const mockReflector = {
getAllAndOverride: jest.fn(),
};

const mockCacheManager = {
get: jest.fn(),
set: jest.fn(),
};

const mockTenantService = {
getUserTenants: jest.fn(),
getUserAccessLevel: jest.fn(),
isFeatureEnabled: jest.fn(),
};

const mockSubscriptionService = {
getActivePlan: jest.fn(),
};

beforeEach(async () => {
const module: TestingModule = await Test.createTestingModule({
providers: [
RolesGuard,
{ provide: Reflector, useValue: mockReflector },
SaaSGuard,
{ provide: CACHE_MANAGER, useValue: mockCacheManager },
{ provide: 'TenantService', useValue: mockTenantService },
{ provide: 'SubscriptionService', useValue: mockSubscriptionService },
],
}).compile();

 
guard = module.get<RolesGuard>(RolesGuard);
reflector = module.get<Reflector>(Reflector);
});

describe('canActivate', () => {
it('should allow access when no roles are required', () => {
// Arrange
mockReflector.getAllAndOverride.mockReturnValue(undefined);
const context = createMockContext({ user: { id: 1, roles: ['user'] } });

 
  // Act
  const result = guard.canActivate(context);

  // Assert
  expect(result).toBe(true);
  expect(mockReflector.getAllAndOverride).toHaveBeenCalledWith(
    'roles',
    [expect.any(Function), expect.any(Function)]
  );
});

it('should allow access when user has required role', () => {
  // Arrange
  mockReflector.getAllAndOverride.mockReturnValue(['admin']);
  const context = createMockContext({ user: { id: 1, roles: ['admin', 'user'] } });

  // Act
  const result = guard.canActivate(context);

  // Assert
  expect(result).toBe(true);
});

it('should deny access when user lacks required role', () => {
  // Arrange
  mockReflector.getAllAndOverride.mockReturnValue(['admin']);
  const context = createMockContext({ user: { id: 1, roles: ['user'] } });

  // Act
  const result = guard.canActivate(context);

  // Assert
  expect(result).toBe(false);
});

it('should deny access when user is not authenticated', () => {
  // Arrange
  mockReflector.getAllAndOverride.mockReturnValue(['user']);
  const context = createMockContext({ user: null });

  // Act
  const result = guard.canActivate(context);

  // Assert
  expect(result).toBe(false);
});

it('should check handler metadata before class metadata', () => {
  // Arrange
  mockReflector.getAllAndOverride.mockImplementation((key, targets) => {
    // Simulate handler overriding class metadata
    if (targets[0].name === 'handlerMethod') {
      return ['admin'];
    }
    return ['user'];
  });

  const context = createMockContext(
    { user: { id: 1, roles: ['admin'] } },
    'handlerMethod'
  );

  // Act
  const result = guard.canActivate(context);

  // Assert
  expect(result).toBe(true);
  expect(mockReflector.getAllAndOverride).toHaveBeenCalledWith(
    'roles',
    [expect.any(Function), expect.any(Function)]
  );
});
});
});

describe('SaaSGuard', () => {
let guard: SaaSGuard;
let reflector: Reflector;
let cacheManager: any;
let tenantService: any;
let subscriptionService: any;

beforeEach(async () => {
// Reset all mocks
jest.clearAllMocks();

 
const module: TestingModule = await Test.createTestingModule({
  providers: [
    SaaSGuard,
    {
      provide: Reflector,
      useValue: {
        getAllAndOverride: jest.fn(),
      },
    },
    {
      provide: CACHE_MANAGER,
      useValue: {
        get: jest.fn(),
        set: jest.fn(),
      },
    },
    {
      provide: 'TenantService',
      useValue: {
        getUserTenants: jest.fn(),
        getUserAccessLevel: jest.fn(),
        isFeatureEnabled: jest.fn(),
      },
    },
    {
      provide: 'SubscriptionService',
      useValue: {
        getActivePlan: jest.fn(),
      },
    },
  ],
}).compile();

guard = module.get<SaaSGuard>(SaaSGuard);
reflector = module.get<Reflector>(Reflector);
cacheManager = module.get(CACHE_MANAGER);
tenantService = module.get('TenantService');
subscriptionService = module.get('SubscriptionService');
});

it('should throw ForbiddenException when user is not authenticated', async () => {
// Arrange
const context = createMockContext({ user: null });

 
// Act & Assert
await expect(guard.canActivate(context)).rejects.toThrow('Authentication required');
});

it('should validate tenant access successfully', async () => {
// Arrange
const mockUser = { id: 'user-123', roles: ['admin'] };
const mockTenantId = 'tenant-456';

 
const context = createMockContext(
  { 
    user: mockUser,
    headers: { 'x-tenant-id': mockTenantId }
  }
);

// Mock reflector to return no metadata (no special requirements)
reflector.getAllAndOverride.mockReturnValue(undefined);

// Mock tenant service to return user's tenants
tenantService.getUserTenants.mockResolvedValue([mockTenantId, 'tenant-789']);
cacheManager.get.mockResolvedValue(undefined); // Cache miss
cacheManager.set.mockResolvedValue(undefined);

// Act
const result = await guard.canActivate(context);

// Assert
expect(result).toBe(true);
expect(tenantService.getUserTenants).toHaveBeenCalledWith('user-123');
expect(cacheManager.set).toHaveBeenCalledWith(
  'user:user-123:tenants',
  [mockTenantId, 'tenant-789'],
  300000
);
});

it('should check subscription plan when required', async () => {
// Arrange
const mockUser = { id: 'user-123' };
const mockTenantId = 'tenant-456';

 
const context = createMockContext(
  { 
    user: mockUser,
    headers: { 'x-tenant-id': mockTenantId }
  }
);

// Mock tenant access
tenantService.getUserTenants.mockResolvedValue([mockTenantId]);
cacheManager.get.mockResolvedValue(undefined);

// Mock subscription plan requirement
reflector.getAllAndOverride
  .mockReturnValueOnce(undefined) // For tenantAccess
  .mockReturnValueOnce('premium') // For subscriptionPlan
  .mockReturnValueOnce(undefined); // For featureFlag

// Mock subscription service
subscriptionService.getActivePlan.mockResolvedValue('premium');

// Act
const result = await guard.canActivate(context);

// Assert
expect(result).toBe(true);
expect(subscriptionService.getActivePlan).toHaveBeenCalledWith('tenant-456');
});

it('should throw when subscription plan does not match', async () => {
// Arrange
const mockUser = { id: 'user-123' };
const mockTenantId = 'tenant-456';

 
const context = createMockContext(
  { 
    user: mockUser,
    headers: { 'x-tenant-id': mockTenantId }
  }
);

// Mock tenant access
tenantService.getUserTenants.mockResolvedValue([mockTenantId]);
cacheManager.get.mockResolvedValue(undefined);

// Mock subscription plan requirement
reflector.getAllAndOverride
  .mockReturnValueOnce(undefined)
  .mockReturnValueOnce('enterprise') // Requires enterprise
  .mockReturnValueOnce(undefined);

// Mock subscription service returns basic plan
subscriptionService.getActivePlan.mockResolvedValue('basic');

// Act & Assert
await expect(guard.canActivate(context)).rejects.toThrow('enterprise plan required');
});

it('should use cache for tenant lookup', async () => {
// Arrange
const mockUser = { id: 'user-123' };
const mockTenantId = 'tenant-456';

 
const context = createMockContext(
  { 
    user: mockUser,
    headers: { 'x-tenant-id': mockTenantId }
  }
);

// Mock cache hit
cacheManager.get.mockResolvedValue([mockTenantId]);
reflector.getAllAndOverride.mockReturnValue(undefined);

// Act
const result = await guard.canActivate(context);

// Assert
expect(result).toBe(true);
expect(tenantService.getUserTenants).not.toHaveBeenCalled(); // Should use cache
expect(cacheManager.get).toHaveBeenCalledWith('user:user-123:tenants');
});
});

// Helper function to create mock ExecutionContext
function createMockContext(requestData: any, handlerName: string = 'testHandler'): ExecutionContext {
return {
switchToHttp: () => ({
getRequest: () => ({
user: requestData.user,
headers: requestData.headers || {},
params: requestData.params || {},
query: requestData.query || {},
body: requestData.body || {},
method: requestData.method || 'GET',
url: requestData.url || '/test',
}),
getResponse: () => ({}),
}),
getHandler: () => ({
name: handlerName,
}),
getClass: () => ({
name: 'TestController',
}),
getArgs: () => [],
getArgByIndex: () => ({}),
} as any;
}

// Test different error scenarios
describe('Guard Error Scenarios', () => {
it('should handle database errors gracefully', async () => {
// Test that guards handle service failures without crashing
});

it('should validate rate limiting', async () => {
// Test rate limiting logic
});

it('should test edge cases for access level hierarchy', async () => {
// Test that 'admin' > 'write' > 'read'
});
}`,


        `// Advanced Guard Composition and Factory Pattern
import { Injectable, CanActivate, ExecutionContext, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

// Guard Factory - creates guards dynamically based on configuration
export class GuardFactory {
static createGuard(config: GuardConfig): Type<CanActivate> {
@Injectable()
class DynamicGuard implements CanActivate {
async canActivate(context: ExecutionContext): Promise<boolean> {
// Dynamic logic based on config
return this.evaluateRules(config.rules, context);
}

 
  private async evaluateRules(rules: Rule[], context: ExecutionContext): Promise<boolean> {
    for (const rule of rules) {
      const result = await this.evaluateRule(rule, context);
      if (!result) {
        return false;
      }
    }
    return true;
  }

  private async evaluateRule(rule: Rule, context: ExecutionContext): Promise<boolean> {
    switch (rule.type) {
      case 'role':
        return this.checkRole(rule, context);
      case 'permission':
        return this.checkPermission(rule, context);
      case 'time':
        return this.checkTimeWindow(rule);
      case 'ip':
        return this.checkIP(rule, context);
      case 'custom':
        return this.customCheck(rule, context);
      default:
        return true;
    }
  }

  private checkRole(rule: RoleRule, context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return request.user?.roles?.includes(rule.role);
  }

  // ... other rule check implementations
}

return DynamicGuard;
}
}

// Usage: Create guards dynamically based on configuration
const adminGuard = GuardFactory.createGuard({
name: 'AdminGuard',
rules: [
{ type: 'role', role: 'admin' },
{ type: 'time', start: '09:00', end: '17:00' },
{ type: 'ip', allowedIPs: ['192.168.1.0/24'] }
]
});

const premiumUserGuard = GuardFactory.createGuard({
name: 'PremiumUserGuard',
rules: [
{ type: 'role', role: 'user' },
{ type: 'permission', permission: 'premium_access' },
{ type: 'custom', handler: 'checkSubscription' }
]
});

// Apply dynamically created guards
@Controller('dynamic')
export class DynamicController {
@Get('admin')
@UseGuards(adminGuard)
getAdminData() {
return { data: 'admin' };
}

@Get('premium')
@UseGuards(premiumUserGuard)
getPremiumData() {
return { data: 'premium' };
}
}

// Conditional Guard Application based on Environment
export function ConditionalGuard(...guards: Type<CanActivate>[]) {
return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
// Only apply guards in production
if (process.env.NODE_ENV === 'production') {
const originalMethod = descriptor.value;

 
  // Wrap with guard logic
  descriptor.value = async function(...args: any[]) {
    const context = this.getExecutionContext(); // Get context somehow
    
    for (const GuardClass of guards) {
      const guard = new GuardClass();
      const canActivate = await guard.canActivate(context);
      
      if (!canActivate) {
        throw new ForbiddenException('Access denied');
      }
    }
    
    return originalMethod.apply(this, args);
  };
}

return descriptor;
};
}

// Usage of conditional guard
@Controller('conditional')
export class ConditionalController {
@Get('sensitive')
@ConditionalGuard(AuthGuard, RolesGuard) // Only in production
getSensitiveData() {
return { data: 'sensitive' };
}
}`,
    ],
    questions: [
        {
            question: "Explain the complete request lifecycle in NestJS, detailing exactly when guards execute relative to middleware, pipes, and interceptors. Provide a concrete example with timing.",
            solution: `<p><strong>Complete Request Lifecycle with Timing Example:</strong>
1. <strong>Request Ingress(0ms):</strong> HTTP request arrives at server.
2. < strong > Global Middleware(1 - 10ms):</strong > <code>app.use()</code> middleware executes(logging, CORS, helmet).
3. < strong > Route - specific Middleware(11 - 20ms):</strong > Module / route middleware executes.
4. < strong > Authentication Middleware(21 - 30ms):</strong > Passport / JWT middleware validates credentials, attaches < code > request.user</code >.
5. < strong > GUARDS EXECUTE(31 - 50ms):</strong > All applicable guards run in order:
        - Global guards(from < code > APP_GUARD</code >)
        - Controller guards(from < code > @UseGuards() </code > on controller)
        - Method guards(from < code > @UseGuards() </code > on handler)
        - Each guard's <code>canActivate()</code> is called
        - If any returns < code > false</code > → immediate termination
6. < strong > Interceptors Pre - handler(51 - 60ms):</strong > <code>intercept()</code> before logic executes.
7. < strong > Pipes(61 - 80ms):</strong > Parameter validation and transformation.
8. < strong > Route Handler(81 - 100ms):</strong > Controller method executes business logic.
9. < strong > Interceptors Post - handler(101 - 110ms):</strong > <code>intercept()</code> after logic transforms response.
10. < strong > Exception Filters(if error):</strong > Catch and format errors.
11. < strong > Response Egress(111 - 120ms):</strong > HTTP response sent.

< strong > Why This Order Matters:</strong > Guards execute AFTER authentication middleware(so they have < code > request.user</code >) but BEFORE pipes and business logic(so unauthorized requests don't waste resources on validation/computation).`
        },
        {
            question: "How do you implement a guard that checks both role-based permissions AND resource ownership? Provide a complete example with database queries and caching.",
            solution: `<p><strong>Combined Role + Ownership Guard Implementation:</strong></p><div style='padding: 12px; border-radius: 8px; font-size: 14px; margin-top: 0.5rem; background-color: #f8fafc; border: 1px solid #e2e8f0;'><pre><code class='language-typescript'>import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
    import { Reflector } from '@nestjs/core';
        import { InjectRepository } from '@nestjs/typeorm';
        import { Repository } from 'typeorm';
        import { Post } from './post.entity';
        import { CACHE_MANAGER } from '@nestjs/cache-manager';
        import { Cache } from 'cache-manager';
        import { SetMetadata } from '@nestjs/common';

        export const RESOURCE_OWNER_KEY = 'resourceOwner';
        export const ResourceOwner = (resourceType: string) =>
            SetMetadata(RESOURCE_OWNER_KEY, resourceType);

    @Injectable()
    export class RoleAndOwnershipGuard implements CanActivate {
        constructor(
            private reflector: Reflector,
            @InjectRepository(Post) private postRepository: Repository<Post>,
            @Inject(CACHE_MANAGER) private cacheManager: Cache,
        ) { }

        async canActivate(context: ExecutionContext): Promise<boolean> {
            const request = context.switchToHttp().getRequest();
            const user = request.user;


            // Check 1: Basic authentication
            if (!user) {
                throw new ForbiddenException('Authentication required');
            }

            // Check 2: Role-based permission
            const requiredRoles = this.reflector.get < string[] > ('roles', context.getHandler());
            if (requiredRoles) {
                const hasRole = requiredRoles.some(role => user.roles?.includes(role));
                if (!hasRole) {
                    throw new ForbiddenException('Insufficient role permissions');
                }
            }

            // Check 3: Resource ownership (if required)
            const resourceType = this.reflector.get < string > (RESOURCE_OWNER_KEY, context.getHandler());
            if (resourceType && this.requiresOwnershipCheck(request, resourceType)) {
                const resourceId = this.extractResourceId(request, resourceType);
                if (resourceId) {
                    const isOwner = await this.checkOwnership(resourceType, resourceId, user.id);
                    if (!isOwner && !user.roles?.includes('admin')) {
                        throw new ForbiddenException('You do not own this resource');
                    }

                    // Attach resource to request for handler use
                    request.resource = await this.getResource(resourceType, resourceId);
                }
            }

            return true;
        }

        private requiresOwnershipCheck(request: any, resourceType: string): boolean {
            // Only check ownership for mutating operations
            const mutatingMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];
            return mutatingMethods.includes(request.method) ||
                request.query.forceOwnershipCheck === 'true';
        }

        private extractResourceId(request: any, resourceType: string): string | null {
            // Extract ID based on resource type and route pattern
            switch (resourceType) {
                case 'post':
                    return request.params.postId || request.params.id;
                case 'comment':
                    return request.params.commentId;
                case 'user':
                    return request.params.userId;
                default:
                    return request.params.id;
            }
        }

        private async checkOwnership(resourceType: string, resourceId: string, userId: string): Promise<boolean> {
            // Cache ownership checks to reduce database load
            const cacheKey = ownership: $ { resourceType }: $ { resourceId }: $ { userId };
            const cached = await this.cacheManager.get < boolean > (cacheKey);


            if (cached !== undefined) {
                return cached;
            }

            let isOwner = false;

            switch (resourceType) {
                case 'post':
                    const post = await this.postRepository.findOne({
                        where: { id: resourceId, authorId: userId },
                        select: ['id'] // Only select ID for performance
                    });
                    isOwner = !!post;
                    break;
                // Add other resource types...
            }

            // Cache result for 5 minutes
            await this.cacheManager.set(cacheKey, isOwner, 300000);
            return isOwner;
        }

        private async getResource(resourceType: string, resourceId: string): Promise<any> {
            // Get full resource for handler use
            switch (resourceType) {
                case 'post':
                    return this.postRepository.findOne({ where: { id: resourceId } });
                default:
                    return null;
            }
        }
    }

    // Usage in controller
    @Controller('posts')
    @UseGuards(RoleAndOwnershipGuard)
    export class PostsController {
        @Get()
        findAll() {
            // No ownership check for listing
            return this.postsService.findAll();
        }

        @Get(':id')
        findOne(@Param('id') id: string) {
            // No ownership check for reading
            return this.postsService.findOne(id);
        }

        @Put(':id')
        @ResourceOwner('post') // Triggers ownership check
        update(
            @Param('id') id: string,
            @Body() updateDto: UpdatePostDto,
            @Request() req
        ) {
            // req.resource contains the post (fetched by guard)
            return this.postsService.update(id, updateDto);
        }

        @Delete(':id')
        @ResourceOwner('post')
        remove(@Param('id') id: string) {
            return this.postsService.remove(id);
        }
    }</code ></pre ></div > <p>This guard combines: 1) Role checking via metadata, 2) Ownership verification with database queries, 3) Caching for performance, 4) Resource pre-fetching for handler use.</p>"
},
    {
        question: "What are the performance implications of using global guards versus method-specific guards? When would you choose each approach?",
        solution: "<p><strong>Performance Implications:</strong>
            < strong > Global Guards(APP_GUARD):</strong > Execute on < em > every</em > request, including static assets, health checks, and public endpoints.This adds overhead even when unnecessary.However, they benefit from shared caching and singleton instantiation.
< strong > Method - specific Guards:</strong > Execute only when their specific route is hit.More efficient for selective protection but can lead to guard duplication and inconsistent security if not carefully managed.

< strong > When to Choose Global Guards:</strong >
    1. < strong > Universal Requirements:</strong > When ALL endpoints need the same check(e.g., JWT authentication in an internal API).
2. < strong > Security Critical:</strong > When forgetting to add a guard would be a security vulnerability.
3. < strong > Performance Optimization:</strong > When guard initialization is expensive and singleton reuse is beneficial.
4. < strong > Consistency:</strong > To ensure uniform security policies.

< strong > When to Choose Method - specific Guards:</strong >
    1. < strong > Mixed Public / Private APIs:</strong > When some endpoints are public(no auth) and others private.
2. < strong > Granular Permissions:</strong > When different endpoints need different permission checks.
3. < strong > Performance Critical Paths:</strong > When certain endpoints must avoid guard overhead.
4. < strong > Legacy Integration:</strong > When gradually adding security to existing APIs.

< strong > Hybrid Approach(Best Practice):</strong > Use global guard for universal checks(authentication) with <code>@Public()</code> decorator to skip it for public endpoints.Add method - specific guards for additional authorization(roles, permissions).This gives both security consistency and performance optimization.</p > `
        },
        {
            question: "How do you test guards that depend on ExecutionContext, Reflector, and external services? Provide a complete testing strategy with mocks.",
            solution: `<p><strong>Complete Guard Testing Strategy:</strong></p><div style='padding: 12px; border-radius: 8px; font-size: 14px; margin-top: 0.5rem; background-color: #f8fafc; border: 1px solid #e2e8f0;'><pre><code class='language-typescript'>import { Test, TestingModule } from '@nestjs/testing';
    import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
    let guard: RolesGuard;
    let reflector: Reflector;

    // Mock factory functions
    const createMockReflector = (metadataValue: any) => ({
        getAllAndOverride: jest.fn().mockReturnValue(metadataValue),
    });

    const createMockContext = (requestData: any = {}, handlerName = 'testHandler') => ({
        switchToHttp: () => ({
            getRequest: () => ({
                user: requestData.user || null,
                headers: requestData.headers || {},
                params: requestData.params || {},
                query: requestData.query || {},
            }),
        }),
        getHandler: () => ({ name: handlerName }),
        getClass: () => ({ name: 'TestController' }),
    } as ExecutionContext);

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RolesGuard,
                {
                    provide: Reflector,
                    useValue: createMockReflector(undefined),
                },
            ],
        }).compile();


        guard = module.get < RolesGuard > (RolesGuard);
        reflector = module.get < Reflector > (Reflector);
    });

    // Test Suite 1: Basic functionality
    describe('Basic Functionality', () => {
        it('should allow access when no roles are required', () => {
            const context = createMockContext({ user: { roles: ['user'] } });
            expect(guard.canActivate(context)).toBe(true);
        });


        it('should allow access when user has required role', () => {
            jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['admin']);
            const context = createMockContext({ user: { roles: ['admin', 'user'] } });
            expect(guard.canActivate(context)).toBe(true);
        });

        it('should deny access when user lacks required role', () => {
            jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['admin']);
            const context = createMockContext({ user: { roles: ['user'] } });
            expect(guard.canActivate(context)).toBe(false);
        });

        it('should deny access when user is not authenticated', () => {
            jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['user']);
            const context = createMockContext({ user: null });
            expect(guard.canActivate(context)).toBe(false);
        });
    });

    // Test Suite 2: Metadata handling
    describe('Metadata Handling', () => {
        it('should check handler metadata before class metadata', () => {
            const mockHandler = { name: 'specificHandler' };
            const mockClass = { name: 'ControllerClass' };


            const mockReflector = {
                getAllAndOverride: jest.fn((key, targets) => {
                    // Simulate handler overriding class
                    if (targets[0] === mockHandler) return ['admin'];
                    if (targets[1] === mockClass) return ['user'];
                    return undefined;
                }),
            };

            const guardWithCustomReflector = new RolesGuard(mockReflector as any);
            const context = {
                switchToHttp: () => ({ getRequest: () => ({ user: { roles: ['admin'] } }) }),
                getHandler: () => mockHandler,
                getClass: () => mockClass,
            } as ExecutionContext;

            expect(guardWithCustomReflector.canActivate(context)).toBe(true);
            expect(mockReflector.getAllAndOverride).toHaveBeenCalledWith(
                'roles',
                [mockHandler, mockClass]
            );
        });

        it('should handle undefined metadata gracefully', () => {
            jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);
            const context = createMockContext({ user: { roles: ['user'] } });
            expect(guard.canActivate(context)).toBe(true);
        });
    });

    // Test Suite 3: Edge cases
    describe('Edge Cases', () => {
        it('should handle empty roles array in user', () => {
            jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['admin']);
            const context = createMockContext({ user: { roles: [] } });
            expect(guard.canActivate(context)).toBe(false);
        });


        it('should handle null roles in user', () => {
            jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['admin']);
            const context = createMockContext({ user: {} }); // No roles property
            expect(guard.canActivate(context)).toBe(false);
        });

        it('should handle multiple required roles (OR logic)', () => {
            jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['admin', 'moderator']);
            const context = createMockContext({ user: { roles: ['moderator'] } });
            expect(guard.canActivate(context)).toBe(true);
        });
    });

    // Test Suite 4: Integration with other services
    describe('Integration Tests', () => {
        it('should work with async guards', async () => {
            const asyncGuard = new (class extends RolesGuard {
                async canActivate(context: ExecutionContext): Promise<boolean> {
                    await new Promise(resolve => setTimeout(resolve, 10)); // Simulate async work
                    return super.canActivate(context);
                }
            })(reflector);


            jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['admin']);
            const context = createMockContext({ user: { roles: ['admin'] } });

            const result = await asyncGuard.canActivate(context);
            expect(result).toBe(true);
        });

        it('should throw ForbiddenException when configured to do so', () => {
            const throwingGuard = new (class extends RolesGuard {
                canActivate(context: ExecutionContext): boolean {
                    const allowed = super.canActivate(context);
                    if (!allowed) {
                        throw new ForbiddenException('Custom message');
                    }
                    return true;
                }
            })(reflector);

            jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['admin']);
            const context = createMockContext({ user: { roles: ['user'] } });

            expect(() => throwingGuard.canActivate(context)).toThrow(ForbiddenException);
            expect(() => throwingGuard.canActivate(context)).toThrow('Custom message');
        });
    });
});

// Testing guards with external dependencies
describe('Guard with External Dependencies', () => {
    it('should inject and use external services', async () => {
        const mockUserService = {
            getUserPermissions: jest.fn().mockResolvedValue(['read:data', 'write:data']),
        };


        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: 'UserService',
                    useValue: mockUserService,
                },
                // Guard that injects UserService...
            ],
        }).compile();

        // Test guard with mocked service...
    });
});</code ></pre ></div > <p><strong>Testing Strategy:</strong> 1) Unit test guard logic in isolation with mocked dependencies. 2) Test all code paths (happy path, error conditions, edge cases). 3) Test metadata handling (handler vs class). 4) Test with different ExecutionContext scenarios. 5) Test async guards. 6) Integration test with real services in e2e tests.</p>`
        },
        {
            question: "Explain how to implement a guard that works across different transport layers (HTTP, WebSockets, gRPC) using ExecutionContext abstraction.",
            solution: `<p><strong>Multi-Transport Guard Implementation:</strong></p><div style='padding: 12px; border-radius: 8px; font-size: 14px; margin-top: 0.5rem; background-color: #f8fafc; border: 1px solid #e2e8f0;'><pre><code class='language-typescript'>import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
    import { WsException } from '@nestjs/websockets';
    import { RpcException } from '@nestjs/microservices';

    export interface User {
        id: string;
        roles: string[];
        permissions: string[];
    }

    export interface AuthResult {
        user: User | null;
        error?: string;
    }

    @Injectable()
    export class UniversalAuthGuard implements CanActivate {
        constructor(private authService: AuthService) { }

        async canActivate(context: ExecutionContext): Promise<boolean> {
            // Determine transport type and extract authentication data
            const authData = this.extractAuthData(context);


            // Authenticate using the extracted data
            const authResult = await this.authService.authenticate(authData);

            if (!authResult.user) {
                this.throwTransportSpecificException(context, authResult.error || 'Unauthorized');
                return false;
            }

            // Attach user to appropriate context
            this.attachUserToContext(context, authResult.user);

            return true;
        }

        private extractAuthData(context: ExecutionContext): any {
            // Handle different transport layers
            switch (context.getType()) {
                case 'http':
                    return this.extractHttpAuthData(context);
                case 'ws':
                    return this.extractWsAuthData(context);
                case 'rpc':
                    return this.extractRpcAuthData(context);
                default:
                    throw new Error(Unsupported transport type: $ {context.getType()});
            }
        }

        private extractHttpAuthData(context: ExecutionContext): any {
            const request = context.switchToHttp().getRequest();
            return {
                transport: 'http',
                token: request.headers.authorization?.replace('Bearer ', ''),
                cookies: request.cookies,
                session: request.session,
                ip: request.ip,
            };
        }

        private extractWsAuthData(context: ExecutionContext): any {
            const client = context.switchToWs().getClient();
            return {
                transport: 'ws',
                token: client.handshake?.auth?.token ||
                    client.handshake?.headers?.authorization?.replace('Bearer ', ''),
                query: client.handshake?.query,
                // WebSocket connection metadata
            };
        }

        private extractRpcAuthData(context: ExecutionContext): any {
            const data = context.switchToRpc().getData();
            const metadata = context.switchToRpc().getContext();


            return {
                transport: 'rpc',
                metadata: metadata.getMap(), // gRPC metadata
                data: data, // RPC payload
                // Extract token from metadata or data
                token: metadata.get('authorization')?.[0] || data?.token,
            };
        }

        private attachUserToContext(context: ExecutionContext, user: User): void {
            switch (context.getType()) {
                case 'http':
                    const request = context.switchToHttp().getRequest();
                    request.user = user;
                    break;
                case 'ws':
                    const client = context.switchToWs().getClient();
                    client.user = user; // Attach to WebSocket client
                    break;
                case 'rpc':
                    const rpcContext = context.switchToRpc().getContext();
                    // For gRPC, we might attach to metadata or context
                    rpcContext.user = user;
                    break;
            }
        }

        private throwTransportSpecificException(context: ExecutionContext, message: string): void {
            switch (context.getType()) {
                case 'http':
                    throw new UnauthorizedException(message);
                case 'ws':
                    throw new WsException(message);
                case 'rpc':
                    throw new RpcException(message);
                default:
                    throw new Error(message);
            }
        }
    }

    // Supporting Auth Service
    @Injectable()
    export class AuthService {
        async authenticate(authData: any): Promise<AuthResult> {
            // Universal authentication logic
            const token = authData.token;


            if (!token) {
                return { user: null, error: 'No authentication token provided' };
            }

            try {
                // Verify token (JWT, session token, etc.)
                const payload = await this.verifyToken(token, authData.transport);

                // Get user from database
                const user = await this.getUserById(payload.sub);

                if (!user) {
                    return { user: null, error: 'User not found' };
                }

                // Additional transport-specific checks
                switch (authData.transport) {
                    case 'http':
                        // HTTP-specific checks (rate limiting, IP restrictions)
                        break;
                    case 'ws':
                        // WebSocket-specific checks (connection limits)
                        break;
                    case 'rpc':
                        // RPC-specific checks (service-to-service auth)
                        break;
                }

                return { user };
            } catch (error) {
                return { user: null, error: error.message };
            }
        }

        private async verifyToken(token: string, transport: string): Promise<any> {
            // Token verification logic that might differ by transport
            // e.g., HTTP uses Bearer tokens, WS might use query params, RPC uses metadata
            return jwt.verify(token, process.env.JWT_SECRET);
        }

        private async getUserById(userId: string): Promise<User | null> {
            // Database lookup
            return { id: userId, roles: ['user'], permissions: [] };
        }
    }

    // Usage in different types of controllers
    @Controller('http-api')
    @UseGuards(UniversalAuthGuard)
    export class HttpController {
        @Get('data')
        getData(@Request() req) {
            // req.user is available
            return { data: 'http', user: req.user };
        }
    }

    @WebSocketGateway()
    @UseGuards(UniversalAuthGuard)
    export class WsController {
        @SubscribeMessage('message')
        handleMessage(@ConnectedSocket() client: any) {
            // client.user is available (attached by guard)
            return { event: 'response', data: Hello $ {client.user.id} };
        }
    }

    @MessagePattern('rpc_command')
    @UseGuards(UniversalAuthGuard)
    export class RpcController {
        async handleRpcCommand(data: any, @Ctx() context: any) {
            // context.user is available
            return { result: 'rpc response', user: context.user };
        }
    }</code ></pre ></div > <p>This guard: 1) Detects transport type via <code>context.getType()</code>, 2) Extracts auth data transport-appropriately, 3) Uses a unified auth service, 4) Attaches user to the appropriate context object, 5) Throws transport-specific exceptions. The same guard logic works across HTTP, WebSockets, and gRPC with transport-specific adaptations.</p>"
},
{
    question: "How do you handle authorization for GraphQL endpoints in NestJS? Compare and contrast with REST guard implementation.",
        solution: "<p><strong>GraphQL Authorization vs REST Guards:</strong>
            < strong > REST Approach:</strong > Guards are applied per route / endpoint via < code > @UseGuards() </code >.Each HTTP endpoint has its own guard configuration.
< strong > GraphQL Challenge:</strong > Single endpoint(<code>/graphql</code>) handles all operations via queries / mutations.Need field - level or resolver - level authorization.

< strong > GraphQL Authorization Strategies:</strong >
        1. < strong > Resolver - level Guards:</strong > Apply guards to GraphQL resolvers similar to REST controllers.
2. < strong > Field - level Authorization:</strong > Use custom decorators on resolver methods or field resolvers.
3. < strong > Schema - level Directives:</strong > Use GraphQL schema directives(<code>@auth</code>, <code>@role</code>).
4. < strong > Middleware / Interceptors:</strong > Use GraphQL middleware in Apollo Server.

< strong > Implementation Examples:</strong ></p ><div style='padding: 12px; border-radius: 8px; font-size: 14px; margin-top: 0.5rem; background-color: #f8fafc; border: 1px solid #e2e8f0;'><pre><code class='language-typescript'>// Option 1: Resolver-level guards (similar to REST)
@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UserResolver {
@Query(() => [User])
@UseGuards(RolesGuard)
@Roles('admin')
users() {
return this.usersService.findAll();
}

@Query(() => User)
@UseGuards(OwnershipGuard)
user(@Args('id') id: string, @Context() context) {
return this.usersService.findOne(id);
}

@Mutation(() => User)
@UseGuards(RolesGuard)
@Roles('admin')
createUser(@Args('data') data: CreateUserInput) {
return this.usersService.create(data);
}
}

// GQL-specific guard that works with GraphQL context
@Injectable()
export class GqlAuthGuard implements CanActivate {
canActivate(context: ExecutionContext): boolean {
const gqlContext = GqlExecutionContext.create(context);
const ctx = gqlContext.getContext();
const user = ctx.req.user; // User from HTTP middleware

 
if (!user) {
  throw new ForbiddenException('Authentication required for GraphQL');
}

// Attach to GraphQL context for field resolvers
ctx.user = user;
return true;
}
}

// Option 2: Field-level authorization with custom decorators
@Resolver(() => User)
export class UserResolver {
@Query(() => [User])
users(@Context() context) {
// Check permissions in resolver
if (!this.authService.canViewUsers(context.user)) {
throw new ForbiddenException('Cannot view users');
}
return this.usersService.findAll();
}

@ResolveField(() => [Order])
@UseGuards(FieldOwnershipGuard)
orders(@Parent() user: User, @Context() context) {
// Field-level guard ensures user can only see their own orders
return this.ordersService.findByUserId(user.id);
}
}

// Field-level guard
@Injectable()
export class FieldOwnershipGuard implements CanActivate {
canActivate(context: ExecutionContext): boolean {
const gqlContext = GqlExecutionContext.create(context);
const info = gqlContext.getInfo();
const parent = gqlContext.getArgs().parent;
const ctx = gqlContext.getContext();

 
// Check if user can access this field on this parent
if (info.fieldName === 'orders' && parent.id !== ctx.user.id) {
  throw new ForbiddenException('Cannot access other users\' orders');
}

return true;
}
}

// Option 3: Schema directives (advanced)
const authDirective = new GraphQLDirective({
name: 'auth',
locations: [DirectiveLocation.FIELD_DEFINITION, DirectiveLocation.OBJECT],
args: {
requires: { type: GraphQLString },
},
});

// In schema
type User @auth(requires: "admin") {
id: ID!
email: String! @auth(requires: "owner")
orders: [Order]
}

// Option 4: Apollo middleware
const authMiddleware = {
async resolve(resolver, parent, args, context, info) {
// Check authorization before resolver executes
const fieldAuth = getFieldAuth(info);
if (fieldAuth && !context.user.roles.includes(fieldAuth.role)) {
throw new ForbiddenException('Unauthorized field access');
}

 
return resolver(parent, args, context, info);
}
};

// Comparison:
// REST: Per-endpoint guards, simple, clear separation
// GraphQL: More complex due to single endpoint, need field/resolver-level checks
// Best Practice: Use GqlAuthGuard for overall authentication + resolver/field guards for specific checks</code></pre></div><p><strong>Key Differences:</strong> GraphQL requires context-aware guards that understand GraphQL execution context (<code>GqlExecutionContext</code>). Field-level authorization is often needed. The same guard logic can be reused but must be adapted for GraphQL's execution model.</p>"
},
{
    question: "What are the security considerations when implementing guards? Discuss common vulnerabilities and mitigation strategies.",
        solution: "<p><strong>Security Considerations for Guards:</strong>
    1. < strong > Authentication Bypass:</strong > Ensure guards actually validate credentials, not just check for presence of user object.Use cryptographic verification(JWT signature checking).
2. < strong > Privilege Escalation:</strong > Implement proper role / permission hierarchy.Always check the server - side, never trust client - provided role claims.
3. < strong > IDOR(Insecure Direct Object Reference):</strong > Ownership guards must verify the authenticated user actually owns requested resources.Never use client - provided IDs without verification.
4. < strong > Rate Limiting:</strong > Guards without rate limiting can enable brute force attacks.Implement request throttling.
5. < strong > Information Leakage:</strong > Different error messages for 'user not found' vs 'access denied' can reveal information.Use generic error messages.
6. < strong > Cache Poisoning:</strong > Cached authorization decisions must be user - specific and time - limited.Include user ID in cache keys.
7. < strong > JWT Vulnerabilities:</strong > Validate JWT signatures, expiration, issuer, audience.Don't trust unsigned or self-signed tokens.
    8. < strong > Session Fixation:</strong > For session - based auth, regenerate session ID after login.

< strong > Mitigation Strategies:</strong ></p > <div style='padding: 12px; border-radius: 8px; font-size: 14px; margin-top: 0.5rem; background-color: #f8fafc; border: 1px solid #e2e8f0;'><pre><code class='language-typescript'>// Secure guard implementation with mitigations
        @Injectable()
        export class SecureGuard implements CanActivate {
            constructor(
                private jwtService: JwtService,
        private rateLimitService: RateLimitService,
        private auditService: AuditService
        ) { }

        async canActivate(context: ExecutionContext): Promise<boolean> {
const request = context.switchToHttp().getRequest();
            const ip = request.ip;


            // 1. Rate limiting to prevent brute force
            const isRateLimited = await this.rateLimitService.isRateLimited(ip, 'auth');
            if (isRateLimited) {
                await this.auditService.logSecurityEvent('rate_limit_exceeded', { ip });
            throw new ForbiddenException('Too many requests');
}

            // 2. Extract and validate JWT securely
            const token = this.extractToken(request);
            if (!token) {
  // Generic error to avoid information leakage
  throw new UnauthorizedException('Authentication required');
}

            try {
  // 3. Validate JWT with all security checks
  const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
            issuer: 'my-app',
            audience: 'my-app-users',
            clockTolerance: 30, // 30 seconds leeway
            maxAge: '2h' // Token maximum age
  });

            // 4. Check token is not blacklisted (for logout functionality)
            const isBlacklisted = await this.isTokenBlacklisted(token);
            if (isBlacklisted) {
                await this.auditService.logSecurityEvent('blacklisted_token_used', { userId: payload.sub });
            throw new UnauthorizedException('Invalid token');
  }

            // 5. Get user from database (not trusting JWT claims alone)
            const user = await this.userService.findById(payload.sub);
            if (!user || !user.isActive) {
    // Generic error
    throw new UnauthorizedException('Authentication failed');
  }

            // 6. Check if password was recently changed (invalidate old tokens)
            if (user.passwordChangedAt && payload.iat * 1000 < user.passwordChangedAt.getTime()) {
                await this.auditService.logSecurityEvent('stale_token_used', { userId: user.id });
            throw new UnauthorizedException('Session expired');
  }

            // 7. Attach minimal user info to request
            request.user = {
                id: user.id,
            roles: user.roles,
            permissions: await this.getUserPermissions(user.id), // Fresh from DB
            sessionId: payload.jti // JWT ID for session tracking
  };

            // 8. Log successful authentication
            await this.auditService.logAuthentication(user.id, ip, true);

            return true;
} catch (error) {
                // 9. Log failed authentication attempts
                await this.auditService.logAuthentication('unknown', ip, false, error.message);

            // 10. Generic error message to avoid information leakage
            throw new UnauthorizedException('Authentication failed');
}
}

            private extractToken(request: any): string | null {
// Securely extract token from multiple sources
const authHeader = request.headers.authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
return authHeader.substring(7);
}


            // Also check cookies (for CSRF-protected endpoints)
            const cookieToken = request.cookies?.access_token;
            if (cookieToken) {
  // Validate cookie has appropriate flags (HttpOnly, Secure, SameSite)
  return cookieToken;
}

            return null;
}

            private async isTokenBlacklisted(token: string): Promise<boolean> {
// Check Redis/DB for blacklisted tokens (for logout functionality)
const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
                return this.cacheManager.get(blacklist:$ {tokenHash}) !== null;
}

                private async getUserPermissions(userId: string): Promise<string[]> {
// Fresh permissions from database, not from JWT
// Cache with short TTL for performance
const cacheKey = user:$ {userId}:permissions;
                const cached = await this.cacheManager.get<string[]>(cacheKey);


                if (cached) {
  return cached;
}

                const permissions = await this.permissionService.getUserPermissions(userId);
                await this.cacheManager.set(cacheKey, permissions, 300000); // 5 minutes

                return permissions;
}
}

// Additional security measures:
// - Use HTTPS only in production
// - Implement CORS properly
// - Add security headers (Helmet middleware)
// - Validate all inputs (even in guards)
// - Use parameterized queries to prevent SQL injection
// - Regular security audits and penetration testing
// - Keep dependencies updated
// - Implement proper logging and monitoring</code></pre></div>`
        }
    ],
    links: [
        "https://docs.nestjs.com/guards",
        "https://docs.nestjs.com/security/authorization",
        "https://docs.nestjs.com/fundamentals/execution-context",
        "https://docs.nestjs.com/security/authentication",
        "https://docs.nestjs.com/recipes/passport",
        "https://docs.nestjs.com/graphql/guards",
        "https://docs.nestjs.com/security/cors",
        "https://docs.nestjs.com/techniques/security",
        "https://docs.nestjs.com/techniques/caching"
    ]
}