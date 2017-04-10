using System.Linq;
using System.Web.Mvc;
using Microsoft.Practices.Unity.Mvc;
using APP.Infrastructure;
using Microsoft.Practices.Unity;
using an2Demo.Data;
using System.Web.Http;

[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(ng2Demo.Web.App_Start.UnityWebActivator), "Start")]
[assembly: WebActivatorEx.ApplicationShutdownMethod(typeof(ng2Demo.Web.App_Start.UnityWebActivator), "Shutdown")]

namespace ng2Demo.Web.App_Start
{
    public class UnityWebActivator
    {
        /// <summary>Integrates Unity when the application starts.</summary>
        public static void Start()
        {
            var container = UnityConfig.GetConfiguredContainer();

            FilterProviders.Providers.Remove(FilterProviders.Providers.OfType<FilterAttributeFilterProvider>().First());
            FilterProviders.Providers.Add(new UnityFilterAttributeFilterProvider(container));

            DependencyResolver.SetResolver(new UnityDependencyResolver(container));

            // TODO: Uncomment if you want to use PerRequestLifetimeManager
            Microsoft.Web.Infrastructure.DynamicModuleHelper.DynamicModuleUtility.RegisterModule(typeof(UnityPerRequestHttpModule));

            container.RegisterTypes(AllClasses.FromLoadedAssemblies()
                .Where(p => p.Namespace.Contains("ng2Demo.Service") || p.Namespace.Contains("ng2Demo.Data"))
                , WithMappings.FromMatchingInterface, WithName.Default, overwriteExistingMappings: true);

            container.RegisterType(typeof(ng2DemoContext), typeof(ng2DemoContext), "", new PerRequestLifetimeManager());
            
        }

        /// <summary>Disposes the Unity container when the application is shut down.</summary>
        public static void Shutdown()
        {
            var container = UnityConfig.GetConfiguredContainer();
            container.Dispose();
        }
    }
}