using an2Demo.Data;
using Microsoft.Practices.Unity;
using Microsoft.Practices.Unity.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Dependencies;

namespace ng2Demo.Web
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            var container = new UnityContainer();
            //container.RegisterType<IProductRepository, ProductRepository>(new HierarchicalLifetimeManager());
            config.DependencyResolver = new WebApiUnityResolver(container);

            container.RegisterTypes(AllClasses.FromLoadedAssemblies()
                .Where(p => p.Namespace.Contains("ng2Demo.Service") || p.Namespace.Contains("ng2Demo.Data"))
                , WithMappings.FromMatchingInterface, WithName.Default, overwriteExistingMappings: true
                //,getLifetimeManager:(t) => new TransientLifetimeManager()
                );
            //container.RegisterType(typeof(ng2DemoContext), typeof(ng2DemoContext), "", new PerThreadLifetimeManager());
            container.RegisterType<ng2DemoContext, ng2DemoContext>(new PerThreadLifetimeManager());

            var cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(cors);
            // Web API 配置和服务

            // Web API 路由
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }

    public class WebApiUnityResolver : IDependencyResolver
    {
        protected IUnityContainer container;

        public WebApiUnityResolver(IUnityContainer container)
        {
            if (container == null)
            {
                throw new ArgumentNullException("container");
            }
            this.container = container;
        }

        public object GetService(Type serviceType)
        {
            try
            {
                return container.Resolve(serviceType);
            }
            catch (ResolutionFailedException)
            {
                return null;
            }
        }

        public IEnumerable<object> GetServices(Type serviceType)
        {
            try
            {
                return container.ResolveAll(serviceType);
            }
            catch (ResolutionFailedException)
            {
                return new List<object>();
            }
        }

        public IDependencyScope BeginScope()
        {
            var child = container.CreateChildContainer();
            return new WebApiUnityResolver(child);
        }

        public void Dispose()
        {
            container.Dispose();
        }
    }
}
